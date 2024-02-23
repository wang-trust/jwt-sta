import { TokenRedisList } from "../redis/tokenRedis.js";


const jwtInfo = {
    "secret": "goupi123456",
    "issuer": "wangtrust.top",
    "audience": "wangtrust.top",
    "refreshtoken": 60 * 60 * 24 * 1000,
    "accesstoken": 60*3
}

const jwtFillterPath = [
    '/api/login'
];

// 配置全局变量
var jwtVar = {};
jwtVar['invalidToken'] = new TokenRedisList();



export {
    jwtInfo,
    jwtVar,
    jwtFillterPath
}