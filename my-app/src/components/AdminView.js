import "./AdminView.css";
import React, { useRef, useState } from "react";
import Button from "./Button";
import UserRow from "./UserRow";

const AdminView = ({ name, users, addUser }) => {
  const nonAdminUsers = users.filter((user) => !user.isAdmin);

  function renderRows() {
    const rows = [];
    for (let i = 0; i < nonAdminUsers.length; i++) {
      rows.push(
        <UserRow key={nonAdminUsers[i].accountNo} client={nonAdminUsers[i]} />
      );
    }
    return rows;
  }

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const balanceRef = useRef();

  const [error, setError] = useState(null);

  return (
    <>
      <h3 className="greeting-text">Welcome, {name}</h3>
      <div className="admin-dashboard">
        <div className="card-container">
          <div className="main-header">
            <h1 className="main-title">Add an account</h1>
          </div>
          <form className="account-form" 
          onSubmit={(e) => {
          e.preventDefault();
          const firstName = firstNameRef.current.value.toUpperCase();
          const lastName = lastNameRef.current.value.toUpperCase();
          const username = usernameRef.current.value;
          const password = passwordRef.current.value;
          const balance = parseFloat(balanceRef.current.value);
            
            const firstNames = users.map((user) => user.firstName);
                const lastNames = users.map((user) => user.lastName);
                const usernames = users.map((user) => user.username);
            
            const firstNameIndex = firstNames.findIndex(
                  (value) => value === firstName
                );
                const lastNameIndex = lastNames.findIndex(
                  (value) => value === lastName
                );
                const usernameIndex = usernames.findIndex(
                  (users) => users === username
                );

                console.log(usernameIndex);

                if (!firstName || !lastName || !username || !password || !balance) {
                  setError("Incomplete information. Please fill in all fields.");
                } else if (usernameIndex >= 0) {
                  setError("Username has been taken.");
                  usernameRef.current.value = null;
                } else if (firstNameIndex === lastNameIndex && firstNameIndex >= 0) {
                  setError("User already exists");
                  firstNameRef.current.value = null;
                  lastNameRef.current.value = null;
                  usernameRef.current.value = null;
                  passwordRef.current.value = null;
                  balanceRef.current.value = null;
                } else if (balance <= 0) {
                  setError("Please enter an amount greater than 0.");
                  balanceRef.current.value = null;
                } else {
                  addUser(firstName, lastName, balance, username, password);
                  setError(null);
                }
              }}
            >
            <div className="form-input-container">
              <label>
                <div className="input-label">First Name</div>
                <input type="text" ref={firstNameRef} required className="input-field" />
              </label>
              <label>
                <div className="input-label">Last Name</div>
                <input type="text" ref={lastNameRef} className="input-field"></input>
              </label>
              <label>
                <div className="input-label">Balance</div>
                <input type="number" ref={balanceRef} className="input-field"></input>
              </label>
              <label>
                <div className="input-label">Username</div>
                <input type="text" ref={usernameRef} className="input-field"></input>
              </label>
              <label>
                <div className="input-label">Password</div>
                <input type="text" ref={passwordRef} className="input-field"></input>
              </label>
            </div>
            {error !== null ? <div className="login-error">{error}</div> : ""}
            <Button className="main-button"
              text="Add User"
            />
          </form>
        </div>
        <br />
        <br />
        <div className="card-container">
          <div className="main-header">
            <h1 className="main-title">Accounts</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Current Balance</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminView;
