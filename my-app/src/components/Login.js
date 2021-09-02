import React, { useState, useRef } from "react";
import Button from "./Button";

export default function Login() {
  const USERNAME = "admin";
  const PASSWORD = "pass123";

  const [credentials] = useState({
    username: USERNAME,
    password: PASSWORD,
  });

  const [message, setMessage] = useState(null);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function submit() {
    const usernameInput = usernameInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (
      usernameInput === credentials.username &&
      passwordInput === credentials.password
    ) {
      setMessage("Login successful.");
      setTimeout(() => {
        setMessage("Redirecting you to the logged in page...");
      }, 500);
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 2000);
    } else {
      setMessage("Login failed. Try again.");
    }

    usernameInputRef.current.value = null;
    passwordInputRef.current.value = null;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn === false) {
    return (
      <div className="loginComponent">
        <div className="loginForm">
          <div>
            <label>
              <div>Username</div>
              <input
                className="usernameInput"
                ref={usernameInputRef}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Password</div>
              <input
                className="passwordInput"
                ref={passwordInputRef}
                type="password"
              />
            </label>
          </div>
          <Button
            className="loginSubmitButton"
            onClick={submit}
            text="Submit"
          />
          <div className="loginMessage">{message}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>This is the logged in page</div>
      </div>
    );
  }
}
