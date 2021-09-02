import React from "react";
import Button from "./Button";

export default function Navbar({ onClick }) {
  return (
    <div>
      <Button
        text="User"
        onClick={() => {
          onClick("user");
        }}
      />
      <Button
        text="Withdraw"
        onClick={() => {
          onClick("withdraw");
        }}
      />
      <Button
        text="Deposit"
        onClick={() => {
          onClick("deposit");
        }}
      />
      <Button
        text="Transfer"
        onClick={() => {
          onClick("transfer");
        }}
      />
    </div>
  );
}
