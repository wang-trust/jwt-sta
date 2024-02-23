import jwt from "jsonwebtoken";


import { jwtInfo, jwtFillterPath } from '../config/config.js';
import { ResponseMsg } from "../config/struct.js";


function matchPath(path) {
    for (let i of jwtFillterPath) {
        if (i === path)
            return true;
    }
    return false;
}


function authenticationMiddleWare(req, res, next) {
    // console.log(req.path);
    // console.log(typeof(req.path));
    // console.log(jwtFillterPath);
    // console.log(typeof(jwtFillterPath));
    // 过滤运行不需要鉴权的path
    if (matchPath(req.path)) {
        // console.log('match succeed');
        next();
        return;
    }
    if (req.cookies === undefined || req.cookies['wangtrust_uid'] === undefined) {
        // console.log('cookie not match');
        res.status(200);
        res.send(ResponseMsg.ResponseErrorMsg('test error!'));
        return;
    } else {
        // console.log('uid_cookies');
        let invalidtoken = req.jwtVar.invalidToken.getInvalid(req.cookies['wangtrust_uid']);
        // console.log(invalidtoken);
        if (invalidtoken) {
            // console.log(token.iatTime);
            // console.log(token.expTime);
            // console.log(Date.now()/1000);
            // res.status(200);
            res.send(ResponseMsg.ResponseErrorMsg('token invalid!'));
            return;
        } else {
            // 对token进行解析，将解析到的信息写入到req
            jwt.verify(req.cookies['wangtrust_uid'], jwtInfo.secret, (err, data) => {
                if(!err){
                    req['userinfo'] = data;
                    next();
                    return;
                } else {
                    res.send(ResponseMsg.ResponseErrorMsg('token failure'));
                    return;
                }
            });

        }


    }


}




export {
    authenticationMiddleWare
}