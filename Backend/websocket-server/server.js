const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 8080 });
const strapiURL = 'http://localhost:1337'; // Adjust the URL if needed

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    console.log("check connection");
    try {
      
      // Extract the token from the incoming message
      const parsedMessage = JSON.parse(message);

      // Directly fetch user information without token authentication
      const user = await axios.get(`${strapiURL}/api/users/me`);
      
      // Send back the echoed message and user info
      ws.send(JSON.stringify({ content: parsedMessage.content, user: user.data }));
      
    } catch (error) {
      console.error('Error:', error.message); // Log the error for debugging
      ws.send(JSON.stringify({ error: 'Failed to retrieve user information' }));
    }
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
