const io = require('socket.io')(3000)
const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
  res.send('test');
})

app.get('/chat', (req,res)=>{
    res.sendFile('./public/index.html');
})

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


app.listen(5500);