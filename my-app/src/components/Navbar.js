import React from "react";
import Button from "./Button";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ /* onClick, */ LogoutFunction }) {
  return (
    <nav className="navbar">
      <NavLink to="/" activeClassName="nav-active" exact className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            home
          </span>
          <span>HOME</span>
        </div>
      </NavLink>
      <NavLink to="/deposit" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            download
          </span>
          <span>DEPOSIT</span>
        </div>

      </NavLink>
      <NavLink to="/withdraw" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            upload
          </span>
          <span>WITHDRAW</span>
        </div>

      </NavLink>
      <NavLink to="/transfer" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            sync_alt
          </span>
          <span>TRANSFER</span>
        </div>

      </NavLink>
      <NavLink to="/transactions" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            sync_alt
          </span>
          <span className="navLinks">Transactions</span>
        </div>
      </NavLink>
      <NavLink to="/" className="nav-button"><Button text="Logout" onClick={() => { LogoutFunction() }} /></NavLink>

    </nav>
  );
}
