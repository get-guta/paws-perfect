import React, { Fragment } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Owners from "./components/Owners";
import Sitters from "./components/Sitters";
import LoginForm from "./components/LoginForm";
import Services from './components/Services';
import Profile from './components/Profile';
import Home from './components/Home';
import Contact from './components/Contact';
import Bookings from './components/Bookings';
import Register from './components/Register';
import FormOwners from './components/FormOwners';
import FormSitters from './components/FormSitters';
import Navbar from "react-bootstrap/Navbar";
import PetSitterCalendar from './components/PetSitterCalendar'




import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const { isloading } = useAuth0();
  if (isloading) return <div>Loading...</div>
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/owners" element={<Owners />} /> */}
        <Route path="/sitters" element={<Sitters />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/register-owner" element={<FormOwners />} />
        <Route path="/register-sitter" element={<FormSitters />} />
        <Route path="/owners" element={<PetSitterCalendar />} />
      </Routes>
    </Router>
  );
}
export default App;