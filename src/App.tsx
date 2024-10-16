import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QrCodeScanner from './page/QrCodeScanner';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QrCodeScanner />} />
      </Routes>
    </Router>
  );
};

export default App;
