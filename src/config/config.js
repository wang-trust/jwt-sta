import { InvalidToken } from "../redis/invalidToken.js";
import { ValidRecord } from "../redis/validRecord.js";

const jwtInfo = {
    "secret": "goupi123456",
    "accesssecret": "goupig!!!!!",
    "issuer": "https://v6.wangtrust.top",
    // "audience": "wangtrust.top",
    "refreshtoken": 60 * 60 * 24,  // s，但cookies中的单位为 ms
    // "refreshtoken": 30,
    "accesstoken": 60 * 60
}

const jwtFillterPath = [
    '/api/jwt/login/refresh'
];

const localizationRedis = {
    invalidToken: 60, // s
    validRecord: 60  // s
}

const logConfig = {
    filename: 'jwtlog.log',
    intervalTime: 60 * 60 * 1000,  // ms
    size: '1MB',
    level: 1 // 1 debug 2 info 3 warning
}

// 配置全局变量
var jwtVar = {};
jwtVar['invalidToken'] = new InvalidToken('invalidToken.json', localizationRedis.invalidToken);
jwtVar['validRecord'] = new ValidRecord('validRecord.json', localizationRedis.validRecord);


export {
    jwtInfo,
    jwtVar,
    jwtFillterPath,
    logConfig
}