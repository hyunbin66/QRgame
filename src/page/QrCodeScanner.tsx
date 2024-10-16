import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent duplicate initialization
    if (document.getElementById('reader')?.innerHTML.trim() === '') {
      const scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      }, false); // Adding 'verbose' argument as false

      scanner.render(
        (decodedText, decodedResult) => {
          // Handle the scanned result here
          setScanResult(`Scanned Result: ${decodedText}`);
          if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
            window.location.href = decodedText; // Navigate to the scanned URL
          } else {
            console.warn('Invalid URL scanned');
          }
        },
        (error) => {
          // Handle scan failure, usually ignore
          console.warn(`QR scan error: ${error}`);
        }
      );

      return () => {
        scanner.clear().catch((error) => {
          console.error('Failed to clear scanner: ', error);
        });
      };
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Mobile QR Code Scanner</h1>
      <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}></div>
      <div id="result">{scanResult}</div>
    </div>
  );
};

export default QrCodeScanner;