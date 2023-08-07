import React, { useEffect, useState, Fragment } from "react";
import HomepageImage from "./images/homepage.jpg";

import Owners from "./components/Owners";
import Sitters from "./components/Sitters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {



  return (
    <div style={{ backgroundImage: `url(${HomepageImage})`, 
                      backgroundRepeat: "no-repeat", 
                      backgroundSize: "cover"}}>
      {/* <img style={{ backgroundImage:`url(${HomepageImage})`, backgroundRepeat:"no-repeat",backgroundSize:"contain" }} /> */}

      <Navbar />

      <main>
        <h1><center>Your Furry Friend's Perfect Stay</center></h1>
        <h3><center>Book your pet's dream sitter and dog walkers!</center></h3>

        <h2>Owners</h2>
        <Owners />
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2>Sitters</h2>
        <Sitters />

      </main>
      <Footer />
    </div>
  );
}
export default App;
