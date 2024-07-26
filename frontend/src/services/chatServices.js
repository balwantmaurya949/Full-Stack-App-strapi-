// src/services/chatService.js
//const token = 'your_static_jwt_token';
//localStorage.setItem('token', token);

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message:', message);
  saveMessage(message);
};

export function sendMessage(content) {
  const message = {
    content,
    //token,
    time: new Date().toLocaleString(),
  };
  ws.send(JSON.stringify(message));
}

export function subscribeToMessages(callback) {
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    callback(message);
  };
}

export function getStoredMessages() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  return messages;
}

function saveMessage(message) {
  const messages = getStoredMessages();
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));
}
