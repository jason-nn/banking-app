
import React from 'react'

const Settings = ({ LogoutFunction }) => {
  return (
    <>
      <div className="nav-link-content" onClick={() => { LogoutFunction() }}>
        <span className="material-icons">
          logout
        </span>
        <span>Logout</span>
      </div>
    </>
  )
}

export default Settings
