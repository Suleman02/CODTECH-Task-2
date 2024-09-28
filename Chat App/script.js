const socket = io();
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');

// Handle user authentication
socket.emit('authenticate', 'username');

// Handle message sending
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('sendMessage', message);
    messageInput.value = '';
  }
});

// Handle new message reception
socket.on('newMessage', (data) => {
  const messageHTML = `
    <li>
      <span>${data.username}:</span>
      <span>${data.message}</span>
    </li>
  `;
  messagesList.innerHTML += messageHTML;
  messagesList.scrollTop = messagesList.scrollHeight;
});