import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

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


// 全局中间件
app.use(crossDomainMiddleware);
app.use(testMiddleWare);

app.get('/login', async (req, res) => {
    let v1 = await UserModel.modelFind('goupi2', '123456');

    v1.signupDate = FormatDate(v1.signupDate);
    res.send(v1);
});


app.post('/login', async (req, res) => {
    console.log('post test')

    console.log(req.body);
    let v1 = await UserModel.modelFind(req.body.username, req.body.password);
    console.log(v1);
    if (v1 === null) {
        res.status(404);
        res.send(ResponseMsg.ResponseErrorMsg('user not find'));
        return;
    }

    // let token = jwt.sign(userInfo, RSA, {
    //     expiresIn: 60 * 60
    // });
    let token = jwt.sign(
        {
            username: v1.username,
            role: v1.role,
            issuer: jwtInfo.secret,
            audience: jwtInfo.audience
        },
        jwtInfo.secret,
        {
            expiresIn: 60 * 60
        }
    );

    console.log(token);

    res.send(ResponseMsg.ResponseRightMsg(token));

});






app.listen(9613, () => {
    console.log('server start...');
});



