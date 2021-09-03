import React, { useState, useRef } from "react";
import Button from "./Button";
import "./Login.css";

export default function Login({ LoginFunction, error }) {
  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: "",
  });

  // gets submit values then passes it back to parent
  const submitHandler = (e) => {
    e.preventDefault();
    LoginFunction(details);
  };

  return (
    <div className="loginComponent">
      <form className="loginForm" onSubmit={submitHandler}>
        <div>
          <label>
            <div>Username</div>
            <input
              className="usernameInput"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            <div>Password</div>
            <input
              className="passwordInput"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
              type="password"
            />
          </label>
        </div>
        <Button className="loginSubmitButton" text="Submit" />
        {error !== "" ? <div className="loginError">{error}</div> : ""}
        <span>*placeholder design</span>
      </form>
    </div>
  );
}
