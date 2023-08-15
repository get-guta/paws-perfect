import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    // console.log("user in profile", user);
    useEffect(() => {
        const checkUser = async () => {
            if(isAuthenticated){
                try {
                 
                    const response = await axios.post("http://localhost:8080/api/login", { sub: user.sub }); // Adjust payload if needed
                    if (response.data.role === "sitter") {
                        localStorage.setItem('user', JSON.stringify(response.data)); // Store user in session storage
                        // console.log(" response data", response.data);
                        navigate("/sitters"); // Navigate to sitters route
                    } else if (response.data.role === "owner") {
                      localStorage.setItem('user', JSON.stringify(response.data)); // Store user in session storage
                        navigate("/owners"); // Navigate to owners route
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.error("Unauthorized user");
                        // Handle error or show message to the user
                    } else {
                        console.error(error);
                    }
                }
            }
        };
        checkUser();
    }, [user, isAuthenticated, navigate]);

    return (
        isAuthenticated && (
            <article>
                <h2>{user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objectKey, i) => <li key={i}>{objectKey}: {user[objectKey]}</li>)}
                </ul>
            </article>
        )
    );
}

export default Profile;
