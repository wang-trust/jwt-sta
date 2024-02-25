import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookParser from "cookie-parser";



import { loginrouter } from "./router/loginRouter.js";
import { ResponseMsg } from "./config/struct.js";
import { jwtInfo } from "./config/config.js";
import { UserModel, UserLoginLogModel } from "./db/mongoMiddle.js";
import { crossDomainMiddleware, testMiddleWare, globalVarMiddleWare } from "./middleWare/crossDomain.js";
import { authenticationMiddleWare } from "./middleWare/authenticationMiddleWare.js";


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

// 路由使用
app.use('/api/jwt/', loginrouter);


app.all('*', (req, res) => {
    res.send('error');
})



app.listen(9613, () => {
    console.log('server start...');
});


