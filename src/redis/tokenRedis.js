import { LinkedList, Node } from "../model/linkedList.js";
import { TokenModel } from "../model/tokenModel.js";


class TokenRedis extends LinkedList {
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

    getInvalid(token) {
        let res = this.getNode(token);
        return res ? res.element : null;
    }

    unshift(token) {
        let res = this.getNode(token);
        if (res !== null) {
            return "Already exists";
        }

        let element = new TokenModel(token);
        if(element['token'] === null) return "token error";
        let newNode = new Node(element, null, null);

        newNode.next = this.head;
        if (this.head !== null) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        this.size++;
        return 0;
    }

    getAllData(){
        let res = [];
        
        let curnode = this.head;
        while(curnode !== null){
            res.push(curnode.element);
            curnode = curnode.next;
        }

        return JSON.stringify(res);
    }

    clearTimeout(){
        let curnode = this.head;

        this.head = null;
        this.size = 0;

        while(curnode !== null){
            this.unshift(curnode.element.token);
            curnode = curnode.next;
        }

    }

}


export {
    TokenRedis
}