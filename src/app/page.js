import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Quagga from "quagga";

export default function Home() {
  const [sessionId, setSessionId] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const initScanner = async () => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner"),
            constraints: {
              width: 480,
              height: 320,
              facingMode: "environment", // or "user" for front camera
            },
          },
          locator: {
            patchSize: "medium",
            halfSample: true,
          },
          numOfWorkers: 2,
          frequency: 10,
          decoder: {
            readers: ["ean_reader"],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
          Quagga.onDetected(handleDetection);
        }
      );
    };

    initScanner();

    return () => {
      Quagga.stop();
    };
  }, []);

  const handleDetection = (result) => {
    if (result && result.codeResult && result.codeResult.code) {
      // Scanned data is available in result.codeResult.code
      const scannedData = result.codeResult.code;
      // Set the scanned data
      setScannedData(scannedData);
    }
  };

  const generateSessionId = () => {
    // Generate session ID logic
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomString = generateRandomString(6); // Generate a random string
    return `${timestamp}-${randomString}`;
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

  const handleGenerateQRCode = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  };

  const handleScan = (scannedData) => {
    // Handle the scanned data here, for example set it as the session ID
    setSessionId(scannedData);
  };

  return (
    <div>
      {!sessionId ? (
        <div>
          <button onClick={handleGenerateQRCode}>Generate QR Code</button>
          {sessionId && <QRCode value={sessionId} />}
          <p>Scan the QR code</p>
        </div>
      ) : (
        <div id="scanner"></div>
      )}

      {sessionId && !scannedData && <p>Waiting for QR code scan...</p>}

      {scannedData && (
        <div>
          <p>Scanned Data: {scannedData}</p>
          <button onClick={() => setScannedData(null)}>Scan Again</button>
          {/* Implement login logic here using sessionId or scannedData */}
        </div>
      )}
    </div>
  );
}
