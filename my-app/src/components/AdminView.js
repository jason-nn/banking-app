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
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Accounts</h2>
      <br />
      <br />
      <label>
        <div>First Name</div>
        <input type="text" ref={firstNameRef} required />
      </label>
      <label>
        <div>Last Name</div>
        <input type="text" ref={lastNameRef}></input>
      </label>
      <label>
        <div>Balance</div>
        <input type="number" ref={balanceRef}></input>
      </label>
      <label>
        <div>Username</div>
        <input type="text" ref={usernameRef}></input>
      </label>
      <label>
        <div>Password</div>
        <input type="text" ref={passwordRef}></input>
      </label>
      <br />
      <br />
      <div>{error}</div>
      <Button
        onClick={() => {
          const firstName = firstNameRef.current.value.toUpperCase();
          const lastName = lastNameRef.current.value.toUpperCase();
          const username = usernameRef.current.value;
          const password = passwordRef.current.value;
          const balance = balanceRef.current.value;

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
          } else {
            addUser(firstName, lastName, balance, username, password);
            setError(null);
          }
        }}
        text="Add User"
      />
      <br />
      <br />
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
  );
};

export default AdminView;
