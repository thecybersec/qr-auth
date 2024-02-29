"use client";
import { useState } from "react";
import QRCode from "qrcode.react";
import { v4 as uuidv4 } from "uuid";

const QRPage = () => {
  const [sessionId, setSessionId] = useState("");

  const generateSessionId = () => {
    const uuid = uuidv4();
    setSessionId(uuid);
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <button onClick={generateSessionId}>Generate Session ID</button>
      <p>Session ID: {sessionId}</p>
      {sessionId && (
        <div>
          <h2>QR Code</h2>
          <QRCode value={sessionId} />
        </div>
      )}
    </div>
  );
};

export default QRPage;
