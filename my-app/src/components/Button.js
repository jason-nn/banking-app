import React from "react";

export default function Button({ className, onClick, text }) {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
