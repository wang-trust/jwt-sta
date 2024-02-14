import express from "express";
import { UserModel } from "./db_middle.js";
import { FormatDate } from "./format.js";

const app = new express();
// 获取请求体
app.use(express.urlencoded({extended: false}))

app.get('/login', async (req, res) => {
    let v1 = await UserModel.modelFind('goupi2', '123456');
    
    v1.signupDate = FormatDate(v1.signupDate);
    res.send(v1);
});





app.listen(9613, () =>{
    console.log('server start...');
});


console.log(123);

