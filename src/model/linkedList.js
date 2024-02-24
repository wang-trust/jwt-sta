// 实现链表结构


class Node {
    constructor(element, next, prev) {
        this.element = element;
        this.next = next;
        this.prev = prev;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 头插法
    unshift(element) {
        let newNode = new Node(element, null, null);

        newNode.next = this.head;
        if (this.head !== null) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        this.size++;
    }

    remove(token){
        let res = this.getNode(token);
        if(res === null) return 0;
        if(res.prev === null && res.next === null){
            this.head = null;
        } else if(res.prev === null){
            this.head = res.next;
            this.head.prev = null;
        } else if (res.next === null){
            res.prev.next = null;
        } else {
            res.prev.next = res.next;
            res.next.prev = res.prev;
        }

        this.size--;
    }

    // get element
    getNode(token) {
        let curnode = this.head;
        while (curnode !== null) {
            if(curnode.element === token){
                return curnode;
            }
            curnode = curnode.next;
        }
        return null;
    }

    length(){
        return this.size;
    }

    foreach() {
        let curnode = this.head;
        console.log('foreach start------------')
        while (curnode !== null) {
            console.log(curnode.element);
            curnode = curnode.next;
        }
        console.log('foreach end------------')
    }

}

// let l1 = new LinkedList();
// l1.unshift('a1');
// l1.unshift('a2');
// l1.unshift('a3');
// l1.unshift('a4');
// l1.foreach();

// // let res = l1.getNode('a4');
// // console.log(res);

// l1.remove('a2');
// l1.foreach();

export {
    LinkedList,
    Node
}

