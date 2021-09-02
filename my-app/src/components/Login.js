import React, { useState, useRef } from "react";

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
          Username:
          <input className="usernameInput" ref={usernameInputRef} type="text" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            className="passwordInput"
            ref={passwordInputRef}
            type="password"
          />
        </label>
      </div>
      <button className="loginSubmitButton" onClick={submit}>
        Submit
      </button>
      <div className="loginMessage">{message}</div>
    </div>
  );
}
