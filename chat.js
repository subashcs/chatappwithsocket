//this one is running on the client
//this io variable we are accessing from the cdn 
var socket = io.connect('http://localhost:4243');


// Query DOM
var message = document.getElementById('message'); //message box
      handle = document.getElementById('handle');//handle box
      btn = document.getElementById('send');
      output = document.getElementById('output');
      feedback= document.getElementById('feedback');
      username = document.getElementById('username');
      setuser = document.getElementById('setuser');

//Emit events or handle events
window.addEventListener('load', () => {
    handle.style.display="none";
  });

setuser.addEventListener('click',function(){
    if(username.value){
        handle.style.display="block";
        handle.innerHTML=username.value;
        username.style.display = "none";
        setuser.style.display="none";
    }
})

btn.addEventListener('click',function(){
    if(handle.innerHTML){
    socket.emit('chat',{
        message:message.value,
        handle:handle.innerHTML
    })
  }
})

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.innerHTML)
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

