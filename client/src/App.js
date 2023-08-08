import React, { useEffect, useState, Fragment } from "react";
import HomepageImage from "./images/homepage.jpg";

import Owners from "./components/Owners";
import Sitters from "./components/Sitters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchSitters from "./components/SearchSitters";


function App() {



  return (
    <div class="container-fluid bg-body"
      style={{
        backgroundImage: `url(${HomepageImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
      
      <Navbar />

      <main>
        <h1 class="text-light">Your Furry Friend's Perfect Stay</h1>
        <h3 class="text-light">Book your pet's dream sitter and dog walkers!</h3>

        <br></br>

        <SearchSitters />

        <br></br>       

      </main>
      <Footer />
    </div>
  );
}
export default App;
