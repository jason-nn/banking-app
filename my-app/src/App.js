import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminView from "./components/AdminView";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";

function App() {
  //for admin user details, planning to merge this with users
  const adminUser = {
    username: "admin",
    password: "pass123",
    name: "Administrator",
    isAdmin: true,
  };

  const [accountNumber, setAccountNumber] = useState(111113);

  // list of users (work in progress)
  const userList = [
    {
      accountNo: null,
      firstName: "ADMINISTRATOR",
      lastName: "",
      balance: null,
      username: "admin",
      password: "pass123",
      isAdmin: true,
    },
    {
      accountNo: 111111,
      firstName: "JUAN",
      lastName: "DE LA CRUZ",
      balance: 2000,
      username: "juan",
      password: "pass123",
      isAdmin: false,
    },
    {
      accountNo: 111112,
      firstName: "JASON",
      lastName: "HO",
      balance: 6900,
      username: "jason",
      password: "jason123",
      isAdmin: false,
    },
    {
      accountNo: 111113,
      firstName: "EMAN",
      lastName: "SIA",
      balance: 4200,
      username: "eman",
      password: "eman123",
      isAdmin: false,
    },
  ];

  function generateAccountNumber() {
    const oldAccountNumber = accountNumber;
    const newAccountNumber = oldAccountNumber + 1;
    setAccountNumber(newAccountNumber);
    return newAccountNumber;
  }

  function addUser(firstName, lastName, balance, username, password) {
    let newUserList = [
      ...users,
      {
        accountNo: generateAccountNumber(),
        firstName: firstName,
        lastName: lastName,
        balance: balance,
        username: username,
        password: password,
        isAdmin: false,
      },
    ];
    setUserList(newUserList);
  }

  function transfer(amount, from, to) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const fromIndex = accountNos.findIndex((accountNo) => accountNo == from);
    const toIndex = accountNos.findIndex((accountNo) => accountNo == to);
    userCopy[fromIndex].balance -= amount;
    userCopy[toIndex].balance += amount;
    setUserList(userCopy);
  }

  function deposit(amount, account) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const accountIndex = accountNos.findIndex(
      (accountNo) => accountNo == account
    );
    userCopy[accountIndex].balance += amount;
    setUserList(userCopy);
  }

  const [users, setUserList] = useState(userList);

  //state for user details
  const [currentUser, setUser] = useState({ name: "", username: "" });

  //state for error message if login failed
  const [error, setError] = useState("");

  //function for logging in
  const LoginFunction = (details) => {
    console.log(details);
    if (
      details.username === adminUser.username &&
      details.password === adminUser.password
    ) {
      setUser({
        name: adminUser.name,
        username: adminUser.username,
      });
      setError("");
    } else {
      setError("Login failed. Please try again.");
    }
  };

  //function for logging out
  const Logout = () => {
    console.log("Logout");
    setUser({ name: "", username: "" });
  };

  return (
    <div>
      {/* If the user info is not blank, show dashboard */}
      {currentUser.username !== "" ? (
        <Router>
          <Navbar LogoutFunction={Logout} />
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <AdminView
                  name={currentUser.name}
                  users={users}
                  addUser={(
                    firstName,
                    lastName,
                    balance,
                    username,
                    password
                  ) => {
                    addUser(firstName, lastName, balance, username, password);
                  }}
                />
              )}
            />
            <Route
              path="/deposit"
              component={() => (
                <Deposit
                  users={users}
                  deposit={(amount, account) => {
                    deposit(amount, account);
                  }}
                />
              )}
            />
            <Route path="/withdraw" component={Withdraw} />
            <Route
              path="/transfer"
              component={() => (
                <Transfer
                  users={users}
                  transfer={(amount, from, to) => {
                    transfer(amount, from, to);
                  }}
                />
              )}
            />
          </Switch>
        </Router>
      ) : (
        /* If there is no current user, show login page */
        <Login LoginFunction={LoginFunction} error={error} />
      )}
    </div>
  );
}

export default App;
