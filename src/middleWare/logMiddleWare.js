import { logCtrl } from "../config/logCtrl.js";


function logMiddleWare(req, res, next){
    logCtrl.logInfo('logMiddleWare', req);
    next();
}


export {
    logMiddleWare
}
