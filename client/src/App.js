import React, { useEffect, useState, Fragment } from "react";

import Owners from "./components/Owners";
import Sitters from "./components/Sitters";
import Login from './components/Login';
import Services from './components/Services';
import Profile from './components/Profile';
import Home from './components/Home';
import Contact from './components/Contact';
import Bookings from './components/Bookings';
import Register from './components/Register';



import { BrowserRouter as Router, Routes, Route, link} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/owners" element={<Owners />}/>
          <Route path="/sitters" element={<Sitters/>}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/register" element={<Register />}/>

        </Routes>
    </Router>

  );
}
export default App;