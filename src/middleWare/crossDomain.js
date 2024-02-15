function crossDomainMiddleware(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
}

function testMiddleWare(req, res, next){
    let {url, ip} = req;
    console.log('middleware test...')
    console.log(`${url}---${ip}`);

    next();
}


export {
    crossDomainMiddleware,
    testMiddleWare
};