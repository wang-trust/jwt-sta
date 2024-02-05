import express from "express";


const app = new express();

app.get('/login', (req, res) => {
    res.end('hello express');
});



app.listen(9613, () =>{
    console.log('server start...');
});


console.log(123);

