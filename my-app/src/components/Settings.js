import React from "react";
import { NavLink } from "react-router-dom";
import SettingsSelect from "./SettingsSelect";
import { useState, useRef } from "react";
import Button from "./Button";

const Settings = ({ LogoutFunction, users, editUser }) => {
  function renderSelectOptions() {
    const options = [];
    for (let i = 0; i < users.length; i++) {
      options.push(
        <SettingsSelect key={users[i].accountNo} client={users[i]} />
      );
    }
    return options;
  }

  const [error, setError] = useState(null);

  const usernameRef = useRef();
  const newUsernameRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordRef2 = useRef();

  return (
    <>
      <div className="card-container">
        <div className="main-header">
          <h1 className="main-title">Edit users</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const username = usernameRef.current.value;
            const newUsername = newUsernameRef.current.value;
            const newPassword = newPasswordRef.current.value;
            const newPassword2 = newPasswordRef2.current.value;

            if (newPassword === newPassword2) {
              editUser(username, newUsername, newPassword);
              newUsernameRef.current.value = null;
              newPasswordRef.current.value = null;
              newPasswordRef2.current.value = null;
              setError("Details successfully changed.");
            } else {
              setError("Passwords do not match. Try again.");
            }
          }}
        >
          <label>
            <div className="input-label">Select a user</div>
            <select className="input-field" ref={usernameRef}>{renderSelectOptions()}</select>
          </label>
          <label>
            <div className="input-label">New username</div>
            <input className="input-field" ref={newUsernameRef} type="text" required />
          </label>
          <label>
            <div className="input-label">New password</div>
            <input className="input-field" ref={newPasswordRef} type="password" required />
          </label>
          <label>
            <div className="input-label">Confirm new password</div>
            <input className="input-field" ref={newPasswordRef2} type="password" required />
          </label>
          <Button className="main-button" text="Submit" />
          <div>{error}</div>
        </form>

      </div>

      <NavLink
        to="/"
        activeClassName="nav-active"
        exact
        className="nav-link"
        onClick={() => {
          LogoutFunction();
        }}
      >
        <div className="nav-link-content">
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </div>
      </NavLink>
    </>
  );
};

export default Settings;
