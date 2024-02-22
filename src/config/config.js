import { TokenRedisList } from "../redis/tokenRedis.js";


const jwtInfo = {
    "secret": "goupi123456",
    "issuer": "wangtrust.top",
    "audience": "wangtrust.top",
    "refreshtoken": 36000,
    "accesstoken": 60*3
}

// 配置全局变量
var jwtVar = {};
jwtVar['invalidToken'] = new TokenRedisList();



export {
    jwtInfo,
    jwtVar
}