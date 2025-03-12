import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection'
import Signup from './pages/Signup';
import Signin from './pages/Signin';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/herosection" element={<HeroSection />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;