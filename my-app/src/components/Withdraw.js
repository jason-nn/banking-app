import React, { useRef, useState } from "react";
import SelectOptions from "./SelectOptions";
import Button from "./Button";

const Withdraw = ({ users, withdraw }) => {
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
  const accountRef = useRef();

  const [message, setMessage] = useState(null);

  const accountNos = users.map((user) => user.accountNo);
  const index = accountNos.findIndex((accountNo) => accountNo == 111111);
  const juanbalance = users[index].balance;

  const [displayBalance, setDisplayBalance] = useState(juanbalance);

  function handleChange(userToDisplay) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const index = accountNos.findIndex(
      (accountNo) => accountNo == userToDisplay
    );

    setDisplayBalance(userCopy[index].balance);
  }

  return (
    <div className="card-container">
      <div className="main-header">
        <h1 className="main-title">Withdraw</h1>
      </div>

      <br />
      <br />
      <label>
        <div className="input-label">Amount (₱)</div>
        <input className="input-field" type="number" ref={amountRef} />
      </label>
      <br />
      <br />
      <label>
        <div className="input-label">Account</div>
        <select className="input-field"
          ref={accountRef}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          {renderSelectOptions()}
        </select>
      </label>
      <br />
      <br />
      <div>Current Balance: ₱{displayBalance}</div>
      <br />
      <br />
      <div>{message}</div>
      <Button className="main-button"
        text="Withdraw"
        onClick={() => {
          const amount = parseFloat(amountRef.current.value);
          const account = accountRef.current.value;

          const accountNos = users.map((user) => user.accountNo);
          const accountIndex = accountNos.findIndex(
            (accountNo) => accountNo == account
          );
          const accountBalance = users[accountIndex].balance;

          if (amount <= 0) {
            setMessage("Please enter an amount greater than 0.");
          } else if (!amount) {
            setMessage("Please enter an amount.");
          } else if (accountBalance < amount) {
            setMessage("Insufficient funds.");
          } else {
            setTimeout(() => {
              withdraw(amount, account);
            }, 1500);
            setMessage(`Withdrawing ₱${amount}...`);
          }
        }}
      />
    </div>
  );
};

export default Withdraw;
