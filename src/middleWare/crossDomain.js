function crossDomainMiddleware(req, res, next){

    res.header("Access-Control-Allow-Origin", req.headers.origin); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); 
    
    // res.header("Access-Control-Allow-Origin", req.headers.origin); 
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true); 



    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', '*');
    // res.header('Access-Control-Allow-Methods', '*');

  
    // res.header("Access-Control-Allow-Origin", "https://wangtrust.top:9611"); 
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true); 


    // res.header("X-Powered-By", ' 3.2.1');

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
    testMiddleWare
};