"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client"; // Importing socket.io-client library

const QRPage = () => {
  const [sessionId, setSessionId] = useState("");
  const [showReload, setShowReload] = useState(true);
  const [sessionIdExists, setSessionIdExists] = useState(false);

  useEffect(() => {
    const generateSessionId = () => {
      const id = uuidv4();
      setSessionId(id);
    };

    generateSessionId();

    // Establish WebSocket connection using socket.io-client
    const socket = io("wss://cms.forexblues.com"); // Adjust URL accordingly

    // Listen for messages
    socket.on("message", (message) => {
      if (message === "SESSION_ID_EXISTS") {
        setSessionIdExists(true);
      } else {
        setSessionIdExists(false);
      }
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  const reloadQRCode = () => {
    setSessionId(uuidv4());
    setShowReload(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <h2 className="text-lg font-semibold mb-8">Session ID: {sessionId}</h2>
      <div className="w-[300px] mx-auto relative">
        {/* QR Code Generator */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${sessionId}&size=200x200`}
          alt="QR Code"
        />
        {/* Blur overlay */}
        {showReload && (
          <div className="absolute top-0 left-[-50px] w-full h-full bg-white bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-[#319688] rounded-full w-40 h-40 flex items-center p-5 text-white text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">↻</div>
                <span onClick={reloadQRCode} className="cursor-pointer">
                  Click to reload QR code
                </span>
                {sessionIdExists && (
                  <span className="block mt-2 text-red-500">
                    Session ID already exists
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPage;
