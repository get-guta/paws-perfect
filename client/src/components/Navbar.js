import React, { useState, useEffect } from 'react';
import PawsPerfectLogo from '../paws_perfect_logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";





function Navbar() {

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();


  return (

    <div>
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <a href="/"><img src={PawsPerfectLogo} alt="Paws Perfect Logo" style={{ width: '120px', height: '50px' }} /></a>

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {/* <li><a href="/owners" class="nav-link px-2 link-secondary">Search Sitters</a></li> */}
          <li><a href="/register" class="nav-link px-2 link-secondary">Join the Team</a></li>
          <li><a href="/contact" class="nav-link px-2 link-secondary">Contact Us</a></li>
        </ul>


        {!isAuthenticated ? (

          <div class="col-md-3 text-end">
            <button
              type="button"
              class="btn btn-secondary me-2"
              onClick={loginWithRedirect}
            >
              Sign in
            </button>

            <button
              type="button"
              class="btn btn-primary"
              onClick={loginWithRedirect}
            >
              Sign up
            </button>

          </div>
        // ) : (
        //   <div class="col-md-3 text-end">
        //     <button  
        //       type="button" 
        //       class="btn btn-outline-primary me-2" 
        //       onClick={() => logout({ returnTo: window.location.origin })}
        //   
        ) : (
          <div>
            <Button
              bg="light"
              data-bs-theme="light"
              variant="light"
              href="/registration"
            >
              Register
            </Button>
          <Button
            bg="light"
            data-bs-theme="light"
            variant="light"
              onClick={() => {
                logout({ returnTo: window.location.origin });
              localStorage.removeItem("sub_id");
              }}
        >
              Sign out
            </Button>

          </div>

        )}
      </header>
    </div>


  )
}

export default Navbar;
