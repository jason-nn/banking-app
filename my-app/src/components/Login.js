import React, { useState, useRef } from "react";
import Button from "./Button";
import "./Login.css";
import Logo from "./bank-logo.svg";

export default function Login({
  setError,
  setUser,
  error,
  users,
  addUser,
  setIsAdmin,
  setSuccessfulSignup,
  successfulSignUp,
}) {
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
      if (users[usernameIndex].isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
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

  const [register, setRegister] = useState(false);

  const [signupError, setSignupError] = useState("");

  const signupFirstNameRef = useRef();
  const signupLastNameRef = useRef();
  const signupUsernameRef = useRef();
  const signupPasswordRef = useRef();

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
      {!register ? (
        <div className="form-container">
          <h1 className="login-logo-mobile">banque.</h1>
          <h2 className="login-message">Log in to your account</h2>
          <form className="login-form" onSubmit={(e) => submitDetails(e)}>
            <div className="input-container">
              <label>
                <div className="login-input-label">Username</div>
                <input
                  className="usernameInput input"
                  ref={usernameInputRef}
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
                  type="password"
                />
              </label>
            </div>
            <div className="button-container">
              <Button
                className="loginSubmitButton login-button"
                text="Log In"
              />
              <Button
                className="secondary-button"
                text="Sign Up"
                onClick={() => {
                  setRegister(true);
                  usernameInputRef.current.value = "";
                  passwordInputRef.current.value = "";
                }}
              />
            </div>
            {error !== "" ? <div className="login-error">{error}</div> : ""}
            {successfulSignUp !== "" ? (
              <div className="signup-success">{successfulSignUp}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      ) : (
        <div className="form-container">
          <h1 className="login-logo-mobile">banque.</h1>
          <h2 className="login-message">Sign up for an account</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              const firstName = signupFirstNameRef.current.value.toUpperCase();
              const lastName = signupLastNameRef.current.value.toUpperCase();
              const username = signupUsernameRef.current.value;
              const password = signupPasswordRef.current.value;

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

              if (!firstName || !lastName || !username || !password) {
                setSignupError(
                  "Incomplete information. Please fill in all fields."
                );
                setTimeout(() => setSignupError(""), 2000);
              } else if (usernameIndex >= 0) {
                setSignupError("Username has been taken.");
                setTimeout(() => setSignupError(""), 2000);
                signupUsernameRef.current.value = null;
              } else if (
                firstNameIndex === lastNameIndex &&
                firstNameIndex >= 0
              ) {
                setSignupError("User already exists");
                setTimeout(() => setSignupError(""), 2000);
                signupFirstNameRef.current.value = null;
                signupLastNameRef.current.value = null;
                signupUsernameRef.current.value = null;
                signupPasswordRef.current.value = null;
              } else {
                addUser(firstName, lastName, 0, username, password);
                setSignupError("");
                setRegister(false);
                setSuccessfulSignup("Account successfully created.");
                setTimeout(() => setSuccessfulSignup(""), 3000);
                signupFirstNameRef.current.value = null;
                signupLastNameRef.current.value = null;
                signupUsernameRef.current.value = null;
                signupPasswordRef.current.value = null;
              }
            }}
          >
            <div className="input-container">
              <label>
                <div className="login-input-label">First Name</div>
                <input
                  className="usernameInput input"
                  ref={signupFirstNameRef}
                  type="text"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <div className="login-input-label">Last Name</div>
                <input
                  className="usernameInput input"
                  ref={signupLastNameRef}
                  type="text"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <div className="login-input-label">Username</div>
                <input
                  className="usernameInput input"
                  ref={signupUsernameRef}
                  type="text"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                <div className="login-input-label">Password</div>
                <input
                  className="passwordInput input"
                  ref={signupPasswordRef}
                  type="password"
                />
              </label>
            </div>
            <div className="button-container">
              <Button
                className="loginSubmitButton login-button"
                text="Sign Up"
              />

              <Button
                className="secondary-button"
                text="Cancel"
                onClick={() => setRegister(false)}
              />
            </div>
            {signupError !== "" ? (
              <div className="login-error">{signupError}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      )}
    </div>
  );
}
