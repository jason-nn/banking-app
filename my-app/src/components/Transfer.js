import React, { useRef, useState } from "react";
import SelectOptions from "./SelectOptions";
import Button from "./Button";

const Transfer = ({ users, transfer }) => {
  const nonAdminUsers = users.filter((user) => !user.isAdmin);

  function renderSelectOptions() {
    const rows = [];
    for (let i = 0; i < nonAdminUsers.length; i++) {
      rows.push(
        <SelectOptions
          key={nonAdminUsers[i].accountNo}
          client={nonAdminUsers[i]}
        />
      );
    }
    return rows;
  }

  const amountRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();

  const [message, setMessage] = useState(null);

  const accountNos = users.map((user) => user.accountNo);
  const index = accountNos.findIndex((accountNo) => accountNo == 111111);
  const juanbalance = users[index].balance;

  const [displayBalance1, setDisplayBalance1] = useState(juanbalance);
  const [displayBalance2, setDisplayBalance2] = useState(juanbalance);

  function handleChange(userToDisplay, n) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const index = accountNos.findIndex(
      (accountNo) => accountNo == userToDisplay
    );
    n === 1
      ? setDisplayBalance1(userCopy[index].balance)
      : setDisplayBalance2(userCopy[index].balance);
  }

  return (
    <div className="card-container">
      <div className="main-header">
        <h1 className="main-title">Transfer</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const amount = parseFloat(amountRef.current.value);
          const from = fromRef.current.value;
          const to = toRef.current.value;

          const accountNos = users.map((user) => user.accountNo);
          const fromIndex = accountNos.findIndex(
            (accountNo) => accountNo == from
          );
          const fromBalance = users[fromIndex].balance;

          if (amount <= 0) {
            setMessage("Please enter an amount greater than 0.");
          } else if (!amount) {
            setMessage("Please enter an amount.");
          } else if (from === to) {
            setMessage("Cannot transfer to the same account.");
          } else if (fromBalance < amount) {
            setMessage("Insufficient funds.");
          } else {
            setTimeout(() => {
              transfer(amount, from, to);
            }, 1500);
            setMessage(`Transferring ₱${amount}...`);
          }
        }}
      >
        <label>
          <div className="input-label">Amount (₱)</div>
          <input className="input-field" type="number" ref={amountRef} />
        </label>
        <br />
        <br />
        <label>
          <div className="input-label">From</div>
          <select className="input-field"
            onChange={(e) => {
              handleChange(e.target.value, 1);
            }}
            ref={fromRef}
          >
            {renderSelectOptions()}
          </select>
        </label>
        <br />
        <div>Current Balance: ₱{displayBalance1}</div>
        <br />
        <br />
        <label>
          <div className="input-label">To</div>
          <select className="input-field"
            onChange={(e) => {
              handleChange(e.target.value, 2);
            }}
            ref={toRef}
          >
            {renderSelectOptions()}
          </select>
        </label>

        <br />
        <div>Current Balance: ₱{displayBalance2}</div>

        {message !== null ? <div className="login-error">{message}</div> : ""}
        <Button className="main-button"
          text="Transfer"
        />
      </form>
    </div>
  );
};

export default Transfer;
