import React from "react";

export default function UserInfoCard({ currentUser }) {
  return (
    <div>
      <div>---</div>
      <h3>Current Balance</h3>
      <br />
      <h1>
        {currentUser.balance.toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })}
      </h1>
      <br />
      <br />
      <h5>
        {currentUser.accountNo} {currentUser.firstName} {currentUser.lastName}
      </h5>
      <div>---</div>
    </div>
  );
}
