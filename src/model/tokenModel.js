import jwt from "jsonwebtoken";


import { jwtInfo } from '../config/config.js';



// function tokenModel(token){
//     let res;
//     new Promise()
//     jwt.verify(token, jwtInfo.secret, (err, data) => {
//         if (!err) {
//             // if(data === null){
//             //     console.log('data is null');
//             //     console.log(data);
//             // }
//             if (data.issuer === jwtInfo.issuer) {
//                 console.log('issuer debug');
//                 console.log(data);
//                 let res =  {
//                     token: token,
//                     uid: data.uid,
//                     username: data.username,
//                     role: data.role,
//                     platform: data.platform,
//                     iatTime: data.iat,
//                     expTime: data.exp
//                 };
//             } else {
//                 res = null;
//             }
//         } else {
//             res =  null;
//         }
//     });
//     return res;
// }

class TokenModel {
    constructor(token) {
        // this.token = token;
        jwt.verify(token, jwtInfo.secret, (err, data) => {
            if (!err) {
                if (data.issuer === jwtInfo.issuer) {
                    this.token = token;
                    this.uid = data.uid;
                    this.username = data.username;
                    this.role = data.role;
                    this.platform = data.platform;
                    this.iatTime = data.iat;
                    this.expTime = data.exp;
                    // console.log(data);
                } else {
                    this.token = null;
                }
            } else {
                this.token = null;
            }
        });
    }
}


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg2ODcxMTYsImV4cCI6MTcwODY4NzEyNn0.ToyBvWD_Wb7xSK7lqNu0gXqLE400ppbQprYaDWhtzHo'
// let t1 = new TokenModel(token);
// console.log(t1);

export {
    TokenModel
}
