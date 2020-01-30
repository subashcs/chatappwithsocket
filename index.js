//this on runs on server
var express = require("express");
var socket = require("socket.io");

//app setup 
var app = express();
var server= app.listen(4243,function(){

    console.log("listening on 4243");
});

//static files 
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection',(socket)=>{
    console.log("made socket connection");
    console.log("socket id",socket.id);
    
    //listens to 'chat' message from client and reads data 
    //then emit it to all clients
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    })
    
    //message typing event handle

    socket.on('typing',function(data){
        //broad cast message
        socket.broadcast.emit('typing',data);
    })
})