import { LinkedList } from "../model/linkedList.js";
import { TokenModel } from "../model/tokenModel.js";


class TokenRedisList extends LinkedList {
    constructor() {
        super();
    }
    getNode(token) {
        let curnode = this.head;
        while (curnode !== null) {
            if (curnode.element.token === token) {
                return curnode;
            }
            curnode = curnode.next;
        }
        return null;
    }

}


export {
    TokenRedisList
}

// let l1 = new TokenRedisList();
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg0OTMxMDYsImV4cCI6MTcwODUyOTEwNn0.h_PD70teVEiMBHUFH7I7P6V4RunmOyMysXsEcaFfCK8'));
// l1.unshift(new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg0OTMxMDYsImV4cCI6MTcwODUyOTEwNn0.h_PD70teVEiMBHUFH7I7P6V4RunmOyMysXsEcaFfCK8'));



// l1.foreach();
// console.log(l1.getNode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoiZ291cGkxIiwicm9sZSI6MSwiaXNzdWVyIjoid2FuZ3RydXN0LnRvcCIsImF1ZGllbmNlIjoid2FuZ3RydXN0LnRvcCIsInBsYXRmb3JtIjpudWxsLCJpYXQiOjE3MDg1MTEzMjcsImV4cCI6MTcwODU0NzMyN30.VbLJ8VjjaWBM7roaGH3VhQbhW3UzyPnYi6KgIVskqtc'));
