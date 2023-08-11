
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    console.log("from useeffect")
    console.log("from useeffect", user)
    const checkUser = async () => {
      if(isAuthenticated){
        try {
          const response = await axios.post("http://localhost:8080/api/login", { user });
          console.log(response)
          
          //redirect to homepahe
  
          //show relevant view based on user type
  
        } catch (error) {
          if (error?.response?.status === 401) {
            navigate("/register-owner");
          }
          console.error(error);
        }

      }
     
    };
    checkUser()
  }, [user])

  return(
      <div className="profile">
         { isAuthenticated && (

            <article>
              {/* {JSON.stringify(user)} */}
              <h2>{user?.name}</h2>
              <ul>
                {Object.keys(user).map((objectKey, i) => <li key={i}>{objectKey}:{user[objectKey]}</li>)}
              </ul>
            </article>
          )}
      <div/>


     {/* {!userInfo ?  (

      <div class="register-links">
        <h2>register as a pet owner</h2>
        <Link to="/register-owner">Go to owners Registration Form</Link>

        <h2>register as a pet sitter</h2>
        <Link to="/register-sitter">Go to Sitters Registration Form</Link>

      </div>
     ) : (
        <Link to="/bookings">Your Bookings</Link>
     )} */}
      </div>

    )

}

export default Profile

