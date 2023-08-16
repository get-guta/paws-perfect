import React, { Fragment, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
import RegisterPage from "./components/RegisterPage";
//import { findUser } from "../../server/db/queries/users";

import HomepageImage from "./images/homepage.jpg";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SitterDetailsForm from "./components/SitterDetailsForm";

import Navbar from "react-bootstrap/Navbar";
import PetSitterCalendar from "./components/PetSitterCalendar";

const ProtectedRoute = ({ children }) => {
    const localUser = localStorage.getItem("user");
    return localUser ? children : <Navigate to="/" />;
};




function App() {
  const { isloading, user } = useAuth0();

  useEffect(() => {
    if (user) { 
      localStorage.setItem("sub_id", user?.sub);
    } else {
      localStorage.removeItem("sub_id"); // <-- This ensures that the sub_id is removed if the user logs out or is not authenticated
    }
  }, [user]);

  if (isloading) return <div>Loading...</div>;
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/register" element={<RegisterPage />} />
        <Route path="/registration" element={<Register />} />
        <Route
          path="/sitters"
          element={
            <ProtectedRoute>
              <Sitters />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/sitters" element={<Sitters />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/register-owner" element={<FormOwners />} />
        <Route path="/register-sitter" element={<FormSitters />} />
        {/* <Route path="/owners" element={<Owners />} /> */}
        <Route
          path="/owners"
          element={
            <ProtectedRoute>
              <PetSitterCalendar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
