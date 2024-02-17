import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookParser from "cookie-parser";
import { FormatDate } from "./format.js";
import { UserModel } from "./db_middle.js";
import { crossDomainMiddleware, testMiddleWare } from "./middleWare/crossDomain.js";
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
app.use(testMiddleWare);


// app.all('*', function (req, res, next) {
//     // res.header("Access-Control-Allow-Origin", req.headers.origin); 
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("Access-Control-Allow-Credentials", true); 
//     next();
// });

app.get('/login', async (req, res) => {
    let v1 = await UserModel.modelFind('goupi2', '123456');

    v1.signupDate = FormatDate(v1.signupDate);
    res.send(v1);
});


app.post('/api/login', async (req, res) => {
    console.log('post test')
    // console.log(req.body);
    let v1 = await UserModel.modelFind(req.body.username, req.body.password);
    // console.log(v1);
    if (v1 === null) {
        res.status(404);
        res.send(ResponseMsg.ResponseErrorMsg('user not find'));
        return;
    }

    let token = jwt.sign(
        {
            username: v1.username,
            role: v1.role,
            issuer: jwtInfo.secret,
            audience: jwtInfo.audience
        },
        jwtInfo.secret,
        {
            expiresIn: jwtInfo.refreshtoken
        }
    );

    console.log(token);

    // res.header("Access-Control-Allow-Credentials", "true");
    res.cookie('wangtrust_uid', token, {
        maxAge: 60*60*24*1000,
        sameSite: 'none',
		secure: 'auto',
        httpOnly: true
        // domain: 'wangtrust.top:9611'
    });

        // res.cookie('wangtrust_uid', token);

    res.send('token get ok!');
    res.end();
});


app.post('/api/test', (req, res) => {
    console.log('api /test');
    console.log(req.get('Cookie'));


    res.send('ok');
});



app.listen(9613, () => {
    console.log('server start...');
});



