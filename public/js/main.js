const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
  console.log(message)
  outputMessage(message)
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get message text 
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);
})

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  
}