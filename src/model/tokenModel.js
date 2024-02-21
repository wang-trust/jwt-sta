import jwt from "jsonwebtoken";


import { jwtInfo } from '../config/config.js';

// const LoginingModel = new mongoose.Schema({
//     uid: Number,
//     username: String,
//     token: String,
//     platform: String,
//     loginTime: {
//       type: Date,
//       default: Date.now
//     },
//     duration: Number
// })

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvdXBpMSIsInJvbGUiOjEsImlzc3VlciI6ImdvdXBpMTIzNDU2IiwiYXVkaWVuY2UiOiJ3YW5ndHJ1c3QudG9wIiwicGxhdGZvcm0iOm51bGwsImlhdCI6MTcwODQ5MjExNSwiZXhwIjoxNzA4NTI4MTE1fQ.GYnNkTfLuYIJMmALeOGtmafn_XbDHjOT_ioD0l5pFOs

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
                    console.log(data);
                }
            }
        })
    }
}

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'
// let t1 = new tokenModel(token);

// console.log(t1);

export {
    TokenModel
}