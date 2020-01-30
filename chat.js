//this one is running on the client
//this io variable we are accessing from the cdn 
var socket = io.connect('http://localhost:4243');


// Query DOM
var message = document.getElementById('message'), //message box
      handle = document.getElementById('handle'),//handle box
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback= document.getElementById('feedback');

//Emit events or handle events

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
})

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value)
})

//listen for events

//chat event
socket.on('chat',function(data){
    //output data received from server to the DOM
    output.innerHTML+="<p><strong>"+data.handle+":"+"</strong>"+data.message+"<p>";
    
    //set feedback message to null since message is now sent
    feedback.innerHTML="";

})

//message typing event

socket.on('typing',function(data){
    feedback.innerHTML='<p><em>'+data+' is typing a message..<em><p>';
})

