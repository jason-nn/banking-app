import React, { useState } from "react";

export default function ControlledInput() {
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    alert(message);
  }

  return (
    <div>
      <br />
      <br />
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      <br />
      <br />
      <div>{message}</div>
    </div>
  );
}
