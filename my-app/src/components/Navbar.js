import React from "react";
import Button from "./Button";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ /* onClick, */ LogoutFunction }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">banque.</h1>
      <NavLink to="/" activeClassName="nav-active" exact className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            home
          </span>
          <span>Home</span>
        </div>
      </NavLink>
      <NavLink to="/deposit" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            download
          </span>
          <span>Deposit</span>
        </div>

      </NavLink>
      <NavLink to="/withdraw" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            upload
          </span>
          <span>Withdraw</span>
        </div>

      </NavLink>
      <NavLink to="/transfer" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            sync_alt
          </span>
          <span>Transfer</span>
        </div>

      </NavLink>
      <NavLink to="/transactions" activeClassName="nav-active" className="nav-link">
        <div className="nav-link-content">
          <span className="material-icons">
            history
          </span>
          <span>Transactions</span>
        </div>
      </NavLink>
      <NavLink to="/" className="nav-link" onClick={() => { LogoutFunction() }}>
        <div className="nav-link-content">
          <span className="material-icons">
            logout
          </span>
          <span>Logout</span>
        </div>
      </NavLink>

    </nav>
  );
}
