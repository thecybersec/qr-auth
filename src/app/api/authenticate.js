// pages/api/authenticate.js
import { v4 as uuidv4 } from "uuid";

// Simulated database of valid users
const validUsers = {
  user1: "password1",
  user2: "password2",
};

// WebSocket setup
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // Handle messages from clients
    // Validate the authentication
    const [username, password] = message.split(":");
    if (validUsers[username] && validUsers[username] === password) {
      // Send success response
      ws.send("success");
    } else {
      // Send failure response
      ws.send("failure");
    }
  });
});

export default function handler(req, res) {
  // Generate a unique token for the user
  const token = uuidv4();
  res.status(200).json({ token });
}
