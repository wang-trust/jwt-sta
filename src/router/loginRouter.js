import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookParser from "cookie-parser";
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"


import { UserModel, UserLoginLogModel } from "../db/mongoMiddle.js";
import { ResponseMsg } from "../config/struct.js";
import { jwtInfo } from "../config/config.js";
import { logCtrl } from "../config/logCtrl.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loginrouter = new express();


loginrouter.post('/login/refresh', async (req, res) => {
    // console.log(req.body);
    let v1 = await UserModel.modelFind(req.body.username, req.body.password);
    if (v1 === null) {
        res.status(200);
        res.send(ResponseMsg.ResponseErrorMsg('user not find'));

        let userrecord = new UserLoginLogModel({
            uid: 0,
            username: req.body.username,
            refer: req.headers.origin,
            platform: null,
            token: null,
            isDone: 1,
            ipaddress: req.get('x-real-ip')
        });
        await userrecord.save();
        return;
    }

    let token = jwt.sign(
        {
            uid: v1.uid,
            username: v1.username,
            role: v1.role,
            issuer: jwtInfo.issuer,
            audience: req.headers.origin,
            platform: null
        },
        jwtInfo.secret,
        {
            expiresIn: jwtInfo.refreshtoken
        }
    );
    // console.log(token);

    res.cookie('wangtrust_uid', token, {
        // maxAge: 60 * 60 * 24 * 1000,
        maxAge: jwtInfo.refreshtoken * 1000,
        sameSite: 'none',
        secure: 'auto',
        httpOnly: true
    });

    let userrecord = new UserLoginLogModel({
        uid: v1.uid,
        username: v1.username,
        refer: req.headers.referer,
        platform: null,
        cookies: token,
        ipaddress: req.get('x-real-ip')
    });
    await userrecord.save();

    // 在线统计
    req.jwtVar.validRecord.unshift(token);
    // req.jwtVar.validRecord.foreach();
    
    // console.log(userrecord);
    // console.log(req.headers);
    // console.log(req.ip);
    // console.log(req.path);
    // console.log(req.url);

    console.log('token get ok!');
    res.send(ResponseMsg.ResponseRightMsg('login succeed'));
});


// 退出登录，将token加入到redis，
loginrouter.post('/login/exit', async (req, res) => {
    req.jwtVar.invalidToken.unshift(req.cookies['wangtrust_uid']);
    // req.jwtVar.invalidToken.foreach();
    // console.log(req.jwtVar.invalidToken.length());
    let userrecord = new UserLoginLogModel({
        uid: req.userinfo.uid,
        username: req.userinfo.username,
        refer: req.headers.referer,
        platform: null,
        // token: req.cookies['wangtrust_uid'],
        cookies: req.cookies['wangtrust_uid'],
        isDone: 2, // 表示退出登录
        ipaddress: req.get('x-real-ip')
    });
    console.log(userrecord);
    await userrecord.save();

    req.jwtVar.validRecord.remove(req.cookies['wangtrust_uid']);
    // req.jwtVar.validRecord.foreach();
    
    console.log('exit succeed!');
    res.send(ResponseMsg.ResponseRightMsg('exit succeed!'));
});

loginrouter.post('/login/access', async (req, res) => {
    console.log('[/login/accesstoken] test');
    let userrecord = new UserLoginLogModel({
        uid: req.userinfo.uid,
        username: req.userinfo.username,
        refer: req.headers.origin,
        platform: null,
        cookies: req.cookies['wangtrust_uid'],
        isDone: 3, // 3表示cookies验证失败
        ipaddress: req.get('x-real-ip')
    });
    // 对cookies信息进行校验
    if(req.userinfo.issuer !== jwtInfo.issuer || req.userinfo.audience !== req.headers.origin){
        res.send(ResponseMsg.ResponseErrorMsg('cookie error'));
        await userrecord.save();
        return;
    }
    // let v1 = await UserModel.modelFind(req.body.username, req.body.password);
    let findres = await UserModel.findOne({
        uid: req.userinfo.uid,
        username: req.userinfo.username
        // username: '123'
    });
    if(findres === null){
        res.send(ResponseMsg.ResponseErrorMsg('cookie error'));
        await userrecord.save();
        return;
    }

    // 生成token
    let token = jwt.sign(
        {
            uid: req.userinfo.uid,
            username: req.userinfo.username,
            role: req.userinfo.role,
            issuer: jwtInfo.accesssecret,
            audience: req.headers.origin,
            platform: null
        },
        jwtInfo.secret,
        {
            expiresIn: jwtInfo.accesstoken
        }
    );

    console.log(`access token: [${token}]`);
    userrecord.isDone = 4;
    userrecord.token = token;
    // console.log(userrecord);

    await userrecord.save();
    res.send(ResponseMsg.ResponseRightMsg({token: token}));
});



loginrouter.post('/login/test', (req, res) => {
    console.log('api /test');
    // console.log(req.cookies['wangtrust_uid']);

    // req.jwtVar.invalidToken.unshift(req.cookies['wangtrust_uid']);
    // req.jwtVar.invalidToken.foreach();
    // console.log(req.jwtVar.invalidToken.length());
    // console.log(req.userinfo);
    // console.log(req.headers.referer);
    // console.log(req.headers.origin);
    // console.log(req.userinfo);

    logCtrl.logInfo('wwww--api /test', req);
    logCtrl.wlogInfo('wwww--api /test', __filename, req);

    res.send(ResponseMsg.ResponseRightMsg('test ok!'));

});


loginrouter.all('*', (req, res) => {
    res.send(ResponseMsg.ResponseErrorMsg('Not find!'));
})



export {
    loginrouter
}