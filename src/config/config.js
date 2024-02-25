import { InvalidToken } from "../redis/invalidToken.js";
import { ValidRecord } from "../redis/validRecord.js";

const jwtInfo = {
    "secret": "goupi123456",
    "issuer": "wangtrust.top",
    "audience": "wangtrust.top",
    "refreshtoken": 60 * 60 * 24,  // s，但cookies中的单位为 ms
    // "refreshtoken": 30,
    "accesstoken": 60
}

const jwtFillterPath = [
    '/api/jwt/login/refreshtoken'
];

const localizationRedis = {
    invalidToken: 10, // s
    validRecord: 10  // s
}

// 配置全局变量
var jwtVar = {};
jwtVar['invalidToken'] = new InvalidToken('invalidToken.json', localizationRedis.invalidToken);
jwtVar['validRecord'] = new ValidRecord('validRecord.json', localizationRedis.validRecord);


export {
    jwtInfo,
    jwtVar,
    jwtFillterPath
}