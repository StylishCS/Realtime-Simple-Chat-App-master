const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res)=>{
    res.send('test');
})

app.get('/chat', (req,res)=>{
    res.sendFile('./public/index.html');
})

app.listen(5500);