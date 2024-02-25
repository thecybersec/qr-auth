"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const ScannerApp = () => {
  const [result, setResult] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      axios
        .post("/api/login", { sessionId, token: data })
        .then((response) => {
          if (response.data.success) {
            setAuthenticated(true);
            alert("Login successful!");
          } else {
            alert("Login failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error authenticating user:", error);
          alert("An error occurred. Please try again later.");
        });
    }
  };

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
  };

  const initiateLogin = () => {
    // Fetch token from server
    axios
      .get("/api/authenticate")
      .then((response) => {
        setSessionId(response.data.sessionId);
        setResult(response.data.token);
      })
      .catch((error) => {
        console.error("Error initiating login:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      {authenticated ? (
        <p>You are authenticated!</p>
      ) : (
        <>
          <button onClick={initiateLogin}>Initiate Login</button>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
          <p>{result}</p>
        </>
      )}
    </div>
  );
};

export default ScannerApp;
