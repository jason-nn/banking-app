import React, { useState, useRef } from "react";
import Button from "./Button";
import "./Login.css";
import Logo from "./bank-logo.svg";

export default function Login({ LoginFunction, error }) {
  const [details, setDetails] = useState({
    usernameInput: "",
    passwordInput: "",
  });

  // gets submit values then passes it back to parent
  const submitHandler = (e) => {
    e.preventDefault();
    LoginFunction(details);
    e.target.value = '';
  };

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
        <form className="login-form" onSubmit={submitHandler}>
          <div className="input-container">
            <label>
              <div className="login-input-label">Username</div>
              <input
                className="usernameInput input"
                onChange={(e) =>
                  setDetails({ ...details, usernameInput: e.target.value })
                }
                value={details.username}
                type="text"
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              <div className="login-input-label">Password</div>
              <input
                className="passwordInput input"
                onChange={(e) =>
                  setDetails({ ...details, passwordInput: e.target.value })
                }
                value={details.password}
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
