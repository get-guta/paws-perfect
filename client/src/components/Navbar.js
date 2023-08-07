import React, { useState, useEffect } from 'react';
import PawsPerfectLogo from '../paws_perfect_logo.png';


function Navbar() {


  return (

    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

       <img src={PawsPerfectLogo} alt="Paws Perfect Logo" style={{ width: '120px', height: '50px' }} />

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">Search Sitters</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Join the Team</a></li>
          <li><a href="#" class="nav-link px-2 link-dark">Services</a></li>
        </ul>

        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary me-2">Login</button>
          <button type="button" class="btn btn-primary">Sign-up</button>
        </div>
      </header>
    </div>


  )
}

export default Navbar;