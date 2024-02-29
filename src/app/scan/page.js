"use client";

import React, { useState } from "react";
import QrReader from "react-qr-reader";

const ScanPage = () => {
  const [scannedData, setScannedData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Scanned Data: {scannedData}</p>
    </div>
  );
};

export default ScanPage;
