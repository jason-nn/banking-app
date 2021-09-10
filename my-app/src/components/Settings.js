
import React from 'react'
import { NavLink } from 'react-router-dom';

const Settings = ({ LogoutFunction }) => {
  return (
    <>
      <NavLink to="/" activeClassName="nav-active" exact className="nav-link" onClick={() => { LogoutFunction() }}>
        <div className="nav-link-content" >
          <span className="material-icons">
            logout
          </span>
          <span>Logout</span>
        </div>
      </NavLink>
    </>
  )
}

export default Settings
