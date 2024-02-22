import jwt from "jsonwebtoken";


import { jwtInfo } from '../config/config.js';
import { ResponseMsg } from "../config/struct.js";


function authenticationMiddleWare(req, res, next){
    // if(req.path === ){

    // }
    if(req.cookies === undefined || req.cookies['wangtrust_uid'] === undefined) {
        console.log('cookie not match');
        req.right = -1;
        res.status(200);

        next();
    } else {
        next();
    }


}




export {
    authenticationMiddleWare
}