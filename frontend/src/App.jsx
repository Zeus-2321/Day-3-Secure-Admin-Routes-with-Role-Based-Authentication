import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; // Updated Home Page import
import Admin from '../pages/Admin'; // Updated Admin Page import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
