const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('a new user has been connected')
  setInterval(()=> socket.emit('msg', {hello: 'socket.io'}), 2500);
  socket.on('msg', msg => console.log(msg))
});



app.set('view engine', 'ejs')

app.get('/', (req, res)=> res.render('home'));

http.listen(3000, ()=> console.log('running...'))