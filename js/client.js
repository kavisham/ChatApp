//to connect client with server

const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('inp');
const messageContainer = document.querySelector(".container");

const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
}

document.getElementById("bold").addEventListener('click',()=>{
    messageContainer.style.fontWeight="bold";
});
document.getElementById("italic").addEventListener('click',()=>{
    messageContainer.style.fontStyle="italic";
});
document.getElementById("strikethrough").addEventListener('click',()=>{
    // alert("strikethrough");
    messageContainer.style.textdecoration="strikethrough";
});
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''; 
})

const nam = prompt("Enter your name to login");
socket.emit('new-user-joined', nam);

socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right');
})

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('left', name =>{
    append(`${data.name} left the chat`,'left');
})