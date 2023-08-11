import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import {Container, Typography} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function MainNavBar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <img src="/logo1.png" alt="logo" />
        </Navbar.Brand>
        <Nav className="lm-auto" variant="light">
          <Button
            bg="light"
            data-bs-theme="light"
            variant="light"
            href="/sitters"
          >
            Search Sitters
          </Button>

          <Button
            bg="light"
            data-bs-theme="light"
            variant="light"
            href="/owners"
          >
            Search Owners
          </Button>

          <Button
            bg="light"
            data-bs-theme="light"
            variant="light"
            href="/bookings"
          >
            Bookings
          </Button>

          <Button bg="light" data-bs-theme="light" variant="light" href="/registration">
            Register
          </Button>

          <Button
            bg="light"
            data-bs-theme="light"
            variant="light"
            href="/Contact"
          >
            Contact Us
          </Button>

          {/* <Nav.Link href="/owners">Search Owners</Nav.Link>
          <Nav.Link href="/bookings">Bookings</Nav.Link>
          <Nav.Link href="/jobs">Join the Team</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link> */}
          {!isAuthenticated ? (
            <>
              <Button
                bg="light"
                data-bs-theme="light"
                variant="light"
                onClick={loginWithRedirect}
              >
                Sign In
              </Button>
              <Button
                bg="light"
                data-bs-theme="light"
                variant="light"
                onClick={loginWithRedirect}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              bg="light"
              data-bs-theme="light"
              variant="light"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Sign Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;