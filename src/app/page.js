// pages/index.js
"use client";
import { useState } from "react";
import QRCode from "qrcode.react";

export default function Home() {
  const [sessionId, setSessionId] = useState(null);

  const generateSessionId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomString = generateRandomString(6); // Generate a random string
    return `${timestamp}-${randomString}`;
  };

  const generateQRCode = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  };

  // Function to generate a random string
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <div>
      {!sessionId ? (
        <button onClick={generateQRCode}>Generate QR Code</button>
      ) : (
        <div>
          <QRCode value={sessionId} />
          <p>Scan the QR code to login</p>
        </div>
      )}
    </div>
  );
}
