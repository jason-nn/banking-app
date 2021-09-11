import React, { useState, useRef } from "react";
import Button from "./Button";
import "./Login.css";
import Logo from "./bank-logo.svg";

export default function Login({ setError, setUser, error, users }) {
  // const [details, setDetails] = useState({
  //   usernameInput: "",
  //   passwordInput: "",
  // });

  // gets submit values then passes it back to parent
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   LoginFunction(details);
  //   e.target.value = "";
  // };

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function submitDetails(e) {
    e.preventDefault();
    const usernameInput = usernameInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    const usernames = users.map((user) => user.username);
    const passwords = users.map((user) => user.password);
    const firstNames = users.map((user) => user.firstName);
    const lastNames = users.map((user) => user.lastName);

    const usernameIndex = usernames.findIndex((i) => i === usernameInput);
    const passwordIndex = passwords.findIndex((i) => i === passwordInput);

    if (usernameInput === "") {
      setError("Please enter a username.");
      setTimeout(() => setError(""), 2000);
    } else if (passwordInput === "") {
      setError("Please enter a password.");
      setTimeout(() => setError(""), 2000);
    } else if (
      usernameIndex === passwordIndex &&
      usernameIndex >= 0 &&
      passwordIndex >= 0
    ) {
      setUser({
        name: firstNames[usernameIndex] /* + " " + lastNames[usernameIndex] */,
        username: usernameInput,
      });
      setError("");
    } else if (usernameIndex === -1) {
      setError("User does not exist.");
      usernameInputRef.current.value = "";
      passwordInputRef.current.value = "";
      setTimeout(() => setError(""), 2000);
    } else if (usernameIndex >= 0) {
      setError("Incorrect password.");
      passwordInputRef.current.value = "";
      setTimeout(() => setError(""), 2000);
    } else {
      setError("Login failed. Please try again.");
      usernameInputRef.current.value = "";
      passwordInputRef.current.value = "";
      setTimeout(() => setError(""), 2000);
    }
    // LoginFunction(usernameInput, passwordInput);
  }

  return (
    <div className="login-component">
      <div className="login-hero">
        <h1 className="login-logo">banque.</h1>
        <div className="hero-content">
          <h1 className="login-hero-title">The bank you can trust.</h1>
          <p className="login-hero-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a nisl
            molestie, pretium eros sit amet, sollicitudin risus. Etiam finibus
            non libero et faucibus. Aliquam eu neque eu arcu ultrices placerat.
            Phasellus nec malesuada elit. Sed eu nibh enim.
          </p>
        </div>
      </div>
      <div className="form-container">
        <h1 className="login-logo-mobile">banque.</h1>
        <h2 className="login-message">Log in to your account</h2>
        {/* <form className="login-form" onSubmit={submitHandler}> */}
        <form className="login-form" onSubmit={(e) => submitDetails(e)}>
          <div className="input-container">
            <label>
              <div className="login-input-label">Username</div>
              <input
                className="usernameInput input"
                ref={usernameInputRef}
                // onChange={(e) =>
                //   setDetails({ ...details, usernameInput: e.target.value })
                // }
                // value={details.username}
                type="text"
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              <div className="login-input-label">Password</div>
              <input
                className="passwordInput input"
                ref={passwordInputRef}
                // onChange={(e) =>
                //   setDetails({ ...details, passwordInput: e.target.value })
                // }
                // value={details.password}
                type="password"
              />
            </label>
          </div>
          <Button className="loginSubmitButton login-button" text="Log In" />
          {error !== "" ? <div className="login-error">{error}</div> : ""}
        </form>
      </div>
    </div>
  );
}
