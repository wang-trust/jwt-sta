
// return msg
class ResponseMsg{
    constructor(){
        this.code = 0;
        this.msg = '';
        this.data = null;
    }


    static ResponseRightMsg(data){
        return {
            code: 0,
            msg: 'succeed',
            data: data
        };
    }
    static ResponseErrorMsg(msg){
        return {
            code: -1,
            msg: msg,
            data: null
        }
    }

}



export {
    ResponseMsg
}
