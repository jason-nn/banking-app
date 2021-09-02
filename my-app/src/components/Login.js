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
    } else {
      setMessage("Login failed. Try again.");
    }

    usernameInputRef.current.value = null;
    passwordInputRef.current.value = null;
  }

  return (
    <div className="login">
      <div>
        <label>
          <div>Username</div>
          <input className="usernameInput" ref={usernameInputRef} type="text" />
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
      <Button className="loginSubmitButton" onClick={submit} text="Submit" />
      <div className="loginMessage">{message}</div>
    </div>
  );
}
