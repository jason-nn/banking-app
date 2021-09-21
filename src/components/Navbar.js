import React from 'react';
// import Button from "./Button";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAdmin }) {
    return (
        <nav className="navbar">
            <div className="main-nav">
                <h1 className="navbar-logo">banque.</h1>
                <NavLink
                    to="/bankingApp"
                    activeClassName="nav-active"
                    exact
                    className="nav-link"
                >
                    <div className="nav-link-content">
                        <span className="material-icons">home</span>
                        <span>Home</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/bankingApp/deposit"
                    activeClassName="nav-active"
                    className="nav-link"
                >
                    <div className="nav-link-content">
                        <span className="material-icons">download</span>
                        <span>Deposit</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/bankingApp/withdraw"
                    activeClassName="nav-active"
                    className="nav-link"
                >
                    <div className="nav-link-content">
                        <span className="material-icons">upload</span>
                        <span>Withdraw</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/bankingApp/transfer"
                    activeClassName="nav-active"
                    className="nav-link"
                >
                    <div className="nav-link-content">
                        <span className="material-icons">sync_alt</span>
                        <span>Transfer</span>
                    </div>
                </NavLink>
                {isAdmin && (
                    <NavLink
                        to="/bankingApp/transactions"
                        activeClassName="nav-active"
                        className="nav-link"
                    >
                        <div className="nav-link-content">
                            <span className="material-icons">history</span>
                            <span>History</span>
                        </div>
                    </NavLink>
                )}
            </div>

            <NavLink
                to="/bankingApp/settings"
                className="nav-link"
                activeClassName="nav-active"
            >
                <div className="nav-link-content">
                    <span className="material-icons">settings</span>
                    <span>Settings</span>
                </div>
            </NavLink>
        </nav>
    );
}
