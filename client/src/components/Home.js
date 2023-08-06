import React, { useEffect, useState, Fragment } from "react";
import Owners from "./Owners";
import Sitters from "./Sitters";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const Home = () => {
  return (
    <>
      <h1>WELCOME TO PAWS PERFECT</h1>
      <h2>Auth0</h2>
      <LoginButton/>
      <LogoutButton/>

      <Profile/>

    </>
  );
}
export default Home;