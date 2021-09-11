import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminView from "./components/AdminView";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";

function App() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // localStorage.clear();

  const [isAdmin, setIsAdmin] = useState(false);

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
      password: "juan23",
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

  const transactionList = [
    {
      key: 222221,
      type: "deposit",
      accountNo: 111111,
      firstName: "JUAN",
      lastName: "DE LA CRUZ",
      amount: 2000,
      date: "SEP 08",
      time: "8:08 PM",
    },
    {
      key: 222222,
      type: "deposit",
      accountNo: 111112,
      firstName: "JASON",
      lastName: "HO",
      amount: 6900,
      date: "SEP 08",
      time: "8:08 PM",
    },
    {
      key: 222223,
      type: "deposit",
      accountNo: 111113,
      firstName: "EMAN",
      lastName: "SIA",
      amount: 4200,
      date: "SEP 08",
      time: "8:08 PM",
    },
  ];

  if (localStorage.bankUsers) {
    console.log("bankUsers exists in local storage");
  } else {
    localStorage.bankUsers = JSON.stringify(userList);
    console.log("bankUsers does not exist in local storage, just created.");
  }

  if (localStorage.transactionHistory) {
    console.log("transactionHistory exists in local storage");
  } else {
    localStorage.transactionHistory = JSON.stringify(transactionList);
    console.log(
      "transactionHistory does not exist in local storage, just created."
    );
  }

  if (localStorage.accountNumber) {
    console.log("accountNumber already exists in local storage.");
  } else {
    localStorage.accountNumber = 111113;
  }

  if (localStorage.transactionKey) {
    console.log("transactionKey already exists in local storage.");
  } else {
    localStorage.transactionKey = 222223;
  }

  function formatDate(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  function getSuffix(hour, minutes) {
    if (hour === 12 && minutes === 0) {
      return "NN";
    } else if (hour >= 12) {
      return "PM";
    } else {
      return "AM";
    }
  }

  function twelveHour(hour) {
    if (hour > 12) {
      return hour - 12;
    } else if (hour === 0) {
      return 12;
    } else {
      return hour;
    }
  }

  function generateAccountNumber() {
    const oldAccountNumber = parseInt(localStorage.accountNumber);
    const newAccountNumber = oldAccountNumber + 1;
    localStorage.accountNumber = newAccountNumber;
    return newAccountNumber;
  }
  function generateTransactionKey() {
    const oldTransactionKey = parseInt(localStorage.transactionKey);
    const newTransactionKey = oldTransactionKey + 1;
    localStorage.transactionKey = newTransactionKey;
    return newTransactionKey;
  }

  function addUser(firstName, lastName, balance, username, password) {
    const newAccountNumber = generateAccountNumber();

    let newUserList = [
      ...users,
      {
        accountNo: newAccountNumber,
        firstName: firstName,
        lastName: lastName,
        balance: balance,
        username: username,
        password: password,
        isAdmin: false,
      },
    ];
    setUserList(newUserList);
    localStorage.bankUsers = JSON.stringify(newUserList);

    const date = new Date();
    const hours = formatDate(twelveHour(date.getHours()));
    const minutes = formatDate(date.getMinutes());
    const seconds = formatDate(date.getSeconds());
    const month = months[date.getMonth()];
    const day = formatDate(date.getDate());
    const suffix = getSuffix(date.getHours(), date.getMinutes());

    const newTransactions = [
      ...transactions,
      {
        key: generateTransactionKey(),
        type: "deposit",
        accountNo: newAccountNumber,
        firstName: firstName,
        lastName: lastName,
        amount: balance,
        date: `${month} ${day}`,
        time: `${hours}:${minutes} ${suffix}`,
      },
    ];
    setTransactions(newTransactions);
    localStorage.transactionHistory = JSON.stringify(newTransactions);
  }

  function transfer(amount, from, to) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const fromIndex = accountNos.findIndex((accountNo) => accountNo == from);
    const toIndex = accountNos.findIndex((accountNo) => accountNo == to);
    userCopy[fromIndex].balance -= amount;
    userCopy[toIndex].balance += amount;
    setUserList(userCopy);

    const date = new Date();
    const hours = formatDate(twelveHour(date.getHours()));
    const minutes = formatDate(date.getMinutes());
    const seconds = formatDate(date.getSeconds());
    const month = months[date.getMonth()];
    const day = formatDate(date.getDate());
    const suffix = getSuffix(date.getHours(), date.getMinutes());

    const newTransactions = [
      ...transactions,
      {
        key: generateTransactionKey(),
        type: "transfer",
        from: from,
        fromFirstName: userCopy[fromIndex].firstName,
        fromLastName: userCopy[fromIndex].lastName,
        to: to,
        toFirstName: userCopy[toIndex].firstName,
        toLastName: userCopy[toIndex].lastName,
        amount: amount,
        date: `${month} ${day}`,
        time: `${hours}:${minutes} ${suffix}`,
      },
    ];
    setTransactions(newTransactions);
    localStorage.transactionHistory = JSON.stringify(newTransactions);
    localStorage.bankUsers = JSON.stringify(userCopy);
  }

  function deposit(amount, account) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const accountIndex = accountNos.findIndex(
      (accountNo) => accountNo == account
    );
    userCopy[accountIndex].balance += amount;
    setUserList(userCopy);

    const date = new Date();
    const hours = formatDate(twelveHour(date.getHours()));
    const minutes = formatDate(date.getMinutes());
    const seconds = formatDate(date.getSeconds());
    const month = months[date.getMonth()];
    const day = formatDate(date.getDate());
    const suffix = getSuffix(date.getHours(), date.getMinutes());

    const newTransactions = [
      ...transactions,
      {
        key: generateTransactionKey(),
        type: "deposit",
        accountNo: account,
        firstName: userCopy[accountIndex].firstName,
        lastName: userCopy[accountIndex].lastName,
        amount: amount,
        date: `${month} ${day}`,
        time: `${hours}:${minutes} ${suffix}`,
      },
    ];
    setTransactions(newTransactions);
    localStorage.transactionHistory = JSON.stringify(newTransactions);
    localStorage.bankUsers = JSON.stringify(userCopy);
  }

  function withdraw(amount, account) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const accountIndex = accountNos.findIndex(
      (accountNo) => accountNo == account
    );
    userCopy[accountIndex].balance -= amount;
    setUserList(userCopy);

    const date = new Date();
    const hours = formatDate(twelveHour(date.getHours()));
    const minutes = formatDate(date.getMinutes());
    const seconds = formatDate(date.getSeconds());
    const month = months[date.getMonth()];
    const day = formatDate(date.getDate());
    const suffix = getSuffix(date.getHours(), date.getMinutes());

    const newTransactions = [
      ...transactions,
      {
        key: generateTransactionKey(),
        type: "withdrawal",
        accountNo: account,
        firstName: userCopy[accountIndex].firstName,
        lastName: userCopy[accountIndex].lastName,
        amount: amount,
        date: `${month} ${day}`,
        time: `${hours}:${minutes} ${suffix}`,
      },
    ];
    setTransactions(newTransactions);
    localStorage.transactionHistory = JSON.stringify(newTransactions);
    localStorage.bankUsers = JSON.stringify(userCopy);
  }

  const [users, setUserList] = useState(JSON.parse(localStorage.bankUsers));

  //state for user details
  const [currentUser, setUser] = useState({ name: "", username: "" });

  //state for error message if login failed
  const [error, setError] = useState("");

  //function for logging in
  // const LoginFunction = (details) => {
  //   console.log(details);
  //   if (
  //     details.username === adminUser.username &&
  //     details.password === adminUser.password
  //   ) {
  //     setUser({
  //       name: adminUser.name,
  //       username: adminUser.username,
  //     });
  //     setError("");
  //   } else {
  //     setError("Login failed. Please try again.");
  //   }
  // };

  // function LoginFunction(usernameInput, passwordInput) {
  //   const usernames = users.map((user) => user.username);
  //   const passwords = users.map((user) => user.password);
  //   const firstNames = users.map((user) => user.firstName);
  //   const lastNames = users.map((user) => user.lastName);

  //   const usernameIndex = usernames.findIndex((i) => i === usernameInput);
  //   const passwordIndex = passwords.findIndex((i) => i === passwordInput);

  //   if (usernameInput === "") {
  //     setError("Please enter a username.");
  //     setTimeout(() => setError(""), 2000);
  //   } else if (passwordInput === "") {
  //     setError("Please enter a password.");
  //     setTimeout(() => setError(""), 2000);
  //   } else if (
  //     usernameIndex === passwordIndex &&
  //     usernameIndex >= 0 &&
  //     passwordIndex >= 0
  //   ) {
  //     setUser({
  //       name: firstNames[usernameIndex] /* + " " + lastNames[usernameIndex] */,
  //       username: usernameInput,
  //     });
  //     setError("");
  //   } else if (usernameIndex === -1) {
  //     setError("User does not exist.");
  //     setTimeout(() => setError(""), 2000);
  //   } else if (usernameIndex >= 0) {
  //     setError("Incorrect password.");
  //     setTimeout(() => setError(""), 2000);
  //   } else {
  //     setError("Login failed. Please try again.");
  //     setTimeout(() => setError(""), 2000);
  //   }
  // }

  //function for logging out
  const Logout = () => {
    setUser({ name: "", username: "" });
    setIsAdmin(false);
  };

  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.transactionHistory)
  );

  function editUser(username, newUsername, newPassword) {
    const userCopy = [...users];
    const usernames = userCopy.map((user) => user.username);
    const usernameIndex = usernames.findIndex((i) => i === username);

    userCopy[usernameIndex].username = newUsername;
    userCopy[usernameIndex].password = newPassword;
    setUserList(userCopy);
    localStorage.bankUsers = JSON.stringify(userCopy);
  }

  return (
    <div className="body">
      {/* If the user info is not blank, show dashboard */}
      {currentUser.username !== "" ? (
        <Router>
          <Navbar LogoutFunction={Logout} isAdmin={isAdmin} />
          <div className="main-content">
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
                    isAdmin={isAdmin}
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
                    isAdmin={isAdmin}
                  />
                )}
              />
              <Route
                path="/withdraw"
                component={() => (
                  <Withdraw
                    users={users}
                    withdraw={(amount, account) => {
                      withdraw(amount, account);
                    }}
                    isAdmin={isAdmin}
                  />
                )}
              />
              <Route
                path="/transfer"
                component={() => (
                  <Transfer
                    users={users}
                    transfer={(amount, from, to) => {
                      transfer(amount, from, to);
                    }}
                    isAdmin={isAdmin}
                  />
                )}
              />
              <Route
                path="/transactions"
                component={() => <Transactions transactions={transactions} />}
                isAdmin={isAdmin}
              />
              <Route
                path="/settings"
                component={() => (
                  <Settings
                    LogoutFunction={Logout}
                    users={users}
                    editUser={(username, newUsername, newPassword) =>
                      editUser(username, newUsername, newPassword)
                    }
                    isAdmin={isAdmin}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      ) : (
        /* If there is no current user, show login page */
        <Login
          // LoginFunction={LoginFunction}
          users={users}
          error={error}
          setError={(a) => setError(a)}
          setUser={(a) => setUser(a)}
          addUser={(firstName, lastName, balance, username, password) => {
            addUser(firstName, lastName, balance, username, password);
          }}
          setIsAdmin={(a) => setIsAdmin(a)}
        />
      )}
    </div>
  );
}

export default App;
