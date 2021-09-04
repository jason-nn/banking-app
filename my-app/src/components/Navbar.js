import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ /* onClick, */ LogoutFunction }) {
  return (
    <nav className="navbar">
      <Link to="/"><span className="navLinks">Home</span></Link>
      <Link to="/deposit"><span className="navLinks">Deposit</span></Link>
      <Link to="/withdraw"><span className="navLinks">Withdraw</span></Link>
      <Link to="/transfer"><span className="navLinks">Transfer</span></Link>
      <Link to="/"><Button text="Logout" onClick={() => { LogoutFunction() }} /></Link>
    </nav>
  );
}
