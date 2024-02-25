// pages/index.js
"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import io from "socket.io-client";

export default function Home() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch token from server
    fetch("/api/authenticate")
      .then((res) => res.json())
      .then((data) => setToken(data.token));

    // Initialize WebSocket connection
    const socket = io("ws://localhost:8080");
    socket.on("message", (message) => {
      if (message === "success") {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAuthentication = () => {
    // Send authentication request to server
    const socket = io("ws://localhost:8080");
    socket.emit("message", `${username}:${password}`);
  };

  return (
    <div>
      {authenticated ? (
        <p>You are authenticated!</p>
      ) : (
        <>
          <p>Scan the QR code to login:</p>
          <QRCode value={token} />
          <button onClick={handleAuthentication}>Authenticate</button>
        </>
      )}
    </div>
  );
}
