import React, { useRef, useState } from "react";
import SelectOptions from "./SelectOptions";
import Button from "./Button";

const Deposit = ({ users, deposit }) => {
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
        <h1 className="main-title">Deposit</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const amount = parseFloat(amountRef.current.value);
          const account = accountRef.current.value;

          if (amount <= 0) {
            setMessage("Please enter an amount greater than 0.");
          } else if (!amount) {
            setMessage("Please enter an amount.");
          } else {
            setTimeout(() => {
              deposit(amount, account);
            }, 1500);
            setMessage(`Depositing ₱${amount}...`);
          }
        }}
      >
        <div className="transaction-form">
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
            <div className="current-balance">Current Balance: ₱{displayBalance.toLocaleString()}</div>
          </label>

          <label>
            <div className="input-label">Amount (₱)</div>
            <input className="input-field" type="number" ref={amountRef} />
          </label>

        </div>
        {message !== null ? <div className="login-error">{message}</div> : ""}
        <Button className="main-button"
          text="Deposit" />
      </form>
    </div>
  );
};

export default Deposit;
