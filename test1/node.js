let express = require('express');
let app = new express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
let cookieParser=require("cookie-parser")
// cookieParser记得要加()
app.use(cookieParser())

//需要安装并且引入中间件cors
const cors = require('cors');

var corsOptions = {
  origin: 'http://127.0.0.1:5500',
  // 允许跨域情况下发送cookie
  credentials: true,
  maxAge: '1728000'
}
app.use(cors(corsOptions))
app.post('/login', function(req, res){
    let name = req.body.name;
    let pwd = req.body.pwd;
    console.log(name, pwd)
    if(name == "Larmy" && pwd==123){
        res.cookie('username',"Larmy")
        res.cookie('login',true)
        console.log("111")
        console.log(req.cookies)
        res.send({
            msg:'success',
            code:200
        })
        res.end()
    }
})
app.get('/cookie', function(req, res){
    console.log();
    res.send(req.cookies)
    
})



// 监听端口
app.listen(3000,() => {
    console.log("3000端口已启用")
})


