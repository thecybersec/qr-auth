"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const QRPage = () => {
  const [sessionId, setSessionId] = useState("");
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    const generateSessionId = () => {
      const id = uuidv4();
      setSessionId(id);
    };

    generateSessionId();

    const timeout = setTimeout(() => {
      setShowReload(true);
    }, 60000);

    return () => clearTimeout(timeout);
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
          <div
            className="absolute top-0 left-[-50px] cursor-pointer w-full h-full bg-white bg-opacity-70 backdrop-blur-sm flex justify-center items-center"
            onClick={reloadQRCode}
          >
            <div className="bg-[#319688] rounded-full w-40 h-40 flex items-center p-5 text-white text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2 flex justify-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="2em"
                    width="2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                    <path d="M20 4v5h-5"></path>
                  </svg>
                </div>
                <span className="uppercase text-xs">
                  Click to reload QR code
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPage;
