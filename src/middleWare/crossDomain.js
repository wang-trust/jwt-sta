import { jwtVar } from "../config/config.js";

function crossDomainMiddleware(req, res, next){
    res.header("Access-Control-Allow-Origin", req.headers.origin); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); 
    
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', '*');
    // res.header('Access-Control-Allow-Methods', '*');

    next();
}

function globalVarMiddleWare(req, res, next){
    req.jwtVar = jwtVar;

    next();
}


function testMiddleWare(req, res, next){
    let {url, ip} = req;
    // console.log('middleware test...')
    // console.log(`${url}---${ip}`);


    next();
}



export {
    crossDomainMiddleware,
    globalVarMiddleWare,
    testMiddleWare
};