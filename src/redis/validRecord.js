import fs from 'fs';

import { LinkedList, Node } from "../model/linkedList.js";
import { TokenModel } from "../model/tokenModel.js";
import { TokenRedis } from './tokenRedis.js';


class ValidRecord extends TokenRedis {
    constructor(path, timeout) {
        super();
        this.path = './log/' + path;
        this.count = 0;

        //启动时读取文件，这部分都采用同步操作，必要加载失败
        // console.log(fs.existsSync(this.path));
        try {
            if (fs.existsSync(this.path)) {
                let loaddata = fs.readFileSync(this.path, 'utf-8');
                let nodes = JSON.parse(loaddata);
                for (let i of nodes) {
                    this.unshift(i['token']);
                    this.size++;
                }
                console.log(`${this.path} load succeed!`);
            }
        } catch {
            this.head = null;
            this.size = 0;
        }



        // 定时同步至本地文件
        if (timeout !== false) {
            setInterval(() => {
                this.clearTimeout();
                let allData = this.getAllData();
                fs.writeFile(this.path, allData,
                    {
                        mode: 438,
                        flag: 'w',
                        encoding: 'utf-8'
                    }, (data) => {
                        // console.log(data);
                    });
                if (this.count === 7) {
                    this.count = 0;
                } else {
                    this.count++;
                }

                console.log(`ValidRecord size: ${this.size}`);
            },
                timeout * 1000);
        }
    }

}


export {
    ValidRecord
}

// let l1 = new TokenRedisList();
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg0OTMxMDYsImV4cCI6MTcwODUyOTEwNn0.h_PD70teVEiMBHUFH7I7P6V4RunmOyMysXsEcaFfCK8'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg0OTMxMDYsImV4cCI6MTcwODUyOTEwNn0.h_PD70teVEiMBHUFH7I7P6V4RunmOyMysXsEcaFfCK8'));



// l1.foreach();
// console.log(l1.getNode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
