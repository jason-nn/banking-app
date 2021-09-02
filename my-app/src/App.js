import React, { useState } from 'react';
import './App.css';
import Login from './components/Login.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminView from './components/AdminView';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';


function App() {

  //for admin user details, planning to merge this with users
  const adminUser = {
    username: "admin",
    password: "pass123",
    name: "Administrator",
    isAdmin: true
  };

  // list of users (work in progress)
  const [users, setUserList] = useState([]);


  //state for user details 
  const [currentUser, setUser] = useState({ name: "", username: "" });

  //state for error message if login failed
  const [error, setError] = useState("");

  //function for logging in
  const LoginFunction = details => {
    console.log(details);
    if (details.username === adminUser.username && details.password === adminUser.password) {
      setUser({
        name: adminUser.name,
        username: adminUser.username
      });
      setError("");
    } else {
      setError('Login failed. Please try again.');
    }
  }

  //function for logging out
  const Logout = () => {
    console.log('Logout');
    setUser({ name: "", username: "" });
  }

  return (
    <div>
      {/* If the user info is not blank, show dashboard */}
      {(currentUser.username !== "") ? (

        <Router>
          <Navbar LogoutFunction={Logout} />
          <Switch>
            <Route path="/" exact component={() => (<AdminView name={currentUser.name} />)} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/transfer" component={Transfer} />
          </Switch>
        </Router>

      ) :
        /* If there is no current user, show login page */
        (
          <Login LoginFunction={LoginFunction} error={error} />
        )
      }
    </div >
  );
}

export default App;
