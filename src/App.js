import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Read from "./pages/Read";
import Search from './pages/Search';
import Tbr from './pages/Tbr';


function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/landingPage' element={<LandingPage />} />
        <Route path='/read' element={<Read />} />
        <Route path='/tbr' element={<Tbr />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
