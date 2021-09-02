import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ /* onClick, */ LogoutFunction }) {
  return (
    <nav>
      <Link to="/"><span>Home</span></Link>
      <Link to="/deposit"><span>Deposit</span></Link>
      <Link to="/withdraw"><span>Withdraw</span></Link>
      <Link to="/transfer"><span>Transfer</span></Link>
      <Link to="/"><Button text="Logout" onClick={() => { LogoutFunction() }} /></Link>
    </nav>
  );
}
