
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Register = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    fetchUserInfo();  // Fetch user info from the backend
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/userinfo'); // Replace with backend API endpoint
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };  

  return(

    <div>


     {!userInfo ?  (

      <div class="register-links">
        <h2>register as a pet owner</h2>
        <Link to="/register-owner">Go to owners Registration Form</Link>

        <h2>register as a pet sitter</h2>
        <Link to="/register-sitter">Go to Sitters Registration Form</Link>

      </div>
     ) : (
        <Link to="/bookings">Your Bookings</Link>
     )}
      </div>

    )

}

export default Register

