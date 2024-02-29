"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const QRPage = () => {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Generate a UUID session ID
    const generateSessionId = () => {
      const id = uuidv4();
      setSessionId(id);
    };

    generateSessionId();
  }, []);

  return (
    <div>
      <h1>QR Code Generator</h1>
      <h2>Session ID: {sessionId}</h2>
      <div style={{ width: "300px", margin: "auto" }}>
        {/* QR Code Generator */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${sessionId}&size=200x200`}
          alt="QR Code"
        />
      </div>
    </div>
  );
};

export default QRPage;
