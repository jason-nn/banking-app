import "./AdminView.css";
import React, { useRef } from "react";
import Button from "./Button";
import UserRow from "./UserRow";

const AdminView = ({ name, users, addUser }) => {
  const nonAdminUsers = users.filter((user) => !user.isAdmin);

  function renderRows() {
    const rows = [];
    for (let i = 0; i < nonAdminUsers.length; i++) {
      rows.push(
        <UserRow key={nonAdminUsers[i].firstName} client={nonAdminUsers[i]} />
      );
    }
    return rows;
  }

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const balanceRef = useRef();

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Accounts</h2>
      <br />
      <br />
      <label>
        <div>First Name</div>
        <input type="text" ref={firstNameRef}></input>
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
      <Button
        onClick={() => {
          const firstName = firstNameRef.current.value.toUpperCase();
          const lastName = lastNameRef.current.value.toUpperCase();
          const username = usernameRef.current.value;
          const password = passwordRef.current.value;
          const balance = balanceRef.current.value;
          addUser(firstName, lastName, balance, username, password);
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
