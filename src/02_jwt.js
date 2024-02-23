import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookParser from "cookie-parser";

import { FormatDate } from "./format.js";
import { UserModel, UserLoginLogModel } from "./db_middle.js";
import { crossDomainMiddleware, testMiddleWare, globalVarMiddleWare } from "./middleWare/crossDomain.js";
import { authenticationMiddleWare } from "./middleWare/authenticationMiddleWare.js";
import { ResponseMsg } from "./config/struct.js";
import { jwtInfo } from "./config/config.js";


const app = new express();

// get body 
// -- 需要设置请求头哦数据类型application/json or xxx application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookParser());

// 全局中间件
app.use(crossDomainMiddleware);
app.use(globalVarMiddleWare);
app.use(authenticationMiddleWare);
app.use(testMiddleWare);



// app.get('/login', async (req, res) => {
//     let v1 = await UserModel.modelFind('goupi2', '123456');

//     v1.signupDate = FormatDate(v1.signupDate);
//     res.send(v1);
// });


app.post('/api/login', async (req, res) => {
    console.log('post test')
    // console.log(req.body);
    let v1 = await UserModel.modelFind(req.body.username, req.body.password);
    // console.log(v1);
    if (v1 === null) {
        res.status(200);
        res.send(ResponseMsg.ResponseErrorMsg('user not find'));

        let userrecord = new UserLoginLogModel({
            uid: 0,
            username: req.body.username,
            refer: req.headers.referer,
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
            audience: jwtInfo.audience,
            platform: null
        },
        jwtInfo.secret,
        {
            expiresIn: jwtInfo.refreshtoken
        }
    );

    console.log(token);
    // res.header("Access-Control-Allow-Credentials", "true");

    res.cookie('wangtrust_uid', token, {
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: 'none',
        secure: 'auto',
        httpOnly: true
        // domain: 'wangtrust.top:9611'
    });

    let userrecord = new UserLoginLogModel({
        uid: v1.uid,
        username: v1.username,
        refer: req.headers.referer,
        platform: null,
        token: token,
        ipaddress: req.get('x-real-ip')
    });
    await userrecord.save();

    // console.log(userrecord);
    // console.log(req.headers);
    // console.log(req.ip);
    console.log(req.path);
    console.log(req.url);


    // res.send('token get ok!');
    res.send(ResponseMsg.ResponseRightMsg('login succeed'));
});


// 退出登录，将token加入到redis，
app.post('/api/login/exit', async (req, res) => {
    if(req.cookies['wangtrust_uid'] === undefined) {
        res.send(ResponseMsg.ResponseErrorMsg('ACCESS ERROR'));
        return;
    }

    req.jwtVar.invalidToken.unshift(req.cookies['wangtrust_uid']);
    req.jwtVar.invalidToken.foreach();
    console.log(req.jwtVar.invalidToken.length());
    
    res.send(ResponseMsg.ResponseRightMsg('exit succeed!'));
});

app.post('/api/test', (req, res) => {
    console.log('api /test');
    console.log(req.cookies['wangtrust_uid']);

    // req.jwtVar.invalidToken.unshift(req.cookies['wangtrust_uid']);
    // req.jwtVar.invalidToken.foreach();
    // console.log(req.jwtVar.invalidToken.length());
    console.log(req.userinfo);

    res.send(ResponseMsg.ResponseRightMsg('test ok!'));

});







app.all('*', (req, res) => {
    res.send('error');
})



app.listen(9613, () => {
    console.log('server start...');
});



