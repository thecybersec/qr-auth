// pages/scan.js
"use client";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import Quagga from "@ericblade/quagga2";

export default function Scan() {
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
              facingMode: "environment", // or 'user' for front camera
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
      alert(`Scanned QR code: ${result.codeResult.code}`);
    }
  };

  return (
    <div>
      <div id="scanner"></div>
    </div>
  );
}
