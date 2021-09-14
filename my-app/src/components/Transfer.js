import React, { useRef, useState } from "react";
import SelectOptions from "./SelectOptions";
import Button from "./Button";

const Transfer = ({ users, transfer, isAdmin }) => {
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
  const [loadingMessage, setLoadingMessage] = useState(null);

  const accountNos = users.map((user) => user.accountNo);
  const index = accountNos.findIndex(
    (accountNo) => parseInt(accountNo) === 111111
  );
  const juanbalance = users[index].balance;

  const [displayBalance1, setDisplayBalance1] = useState(juanbalance);
  const [displayBalance2, setDisplayBalance2] = useState(juanbalance);

  function handleChange(userToDisplay, n) {
    const userCopy = [...users];
    const accountNos = userCopy.map((user) => user.accountNo);
    const index = accountNos.findIndex(
      (accountNo) => parseInt(accountNo) === parseInt(userToDisplay)
    );
    n === 1
      ? setDisplayBalance1(userCopy[index].balance)
      : setDisplayBalance2(userCopy[index].balance);
  }

  if (isAdmin) {
    return (
      <>
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
                (accountNo) => parseInt(accountNo) === parseInt(from)
              );
              const fromBalance = users[fromIndex].balance;

              if (amount <= 0) {
                setMessage("Please enter an amount greater than 0.");
                setTimeout(() => setMessage(null), 2000);
              } else if (!amount) {
                setMessage("Please enter an amount.");
                setTimeout(() => setMessage(null), 2000);
              } else if (from === to) {
                setMessage("Cannot transfer to the same account.");
                setTimeout(() => setMessage(null), 2000);
              } else if (fromBalance < amount) {
                setMessage("Insufficient funds.");
                setTimeout(() => setMessage(null), 2000);
              } else {
                setTimeout(() => {
                  transfer(amount, from, to);
                }, 1500);
                setLoadingMessage(
                  `Transferring ${amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}...`
                );
                // setTimeout(() => setLoadingMessage(null), 2000);
              }
            }}
          >
            <div className="transaction-form">
              <label>
                <div className="input-label">From</div>
                <select
                  className="input-field"
                  onChange={(e) => {
                    handleChange(e.target.value, 1);
                  }}
                  ref={fromRef}
                >
                  {renderSelectOptions()}
                </select>
                <div className="current-balance">
                  Current Balance:{" "}
                  {displayBalance1.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </div>
              </label>

              <label>
                <div className="input-label">To</div>
                <select
                  className="input-field"
                  onChange={(e) => {
                    handleChange(e.target.value, 2);
                  }}
                  ref={toRef}
                >
                  {renderSelectOptions()}
                </select>
                <div className="current-balance">
                  Current Balance:{" "}
                  {displayBalance2.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </div>
              </label>

              <label>
                <div className="input-label">Amount (₱)</div>
                <input
                  className="input-field"
                  type="number"
                  ref={amountRef}
                  step=".01"
                />
              </label>
              <br />
            </div>
            <Button className="main-button" text="Transfer" />
          </form>
        </div>
        {message !== null ? <div className="error-box">{message}</div> : ""}
        {loadingMessage !== null ? (
          <div className="loading-box">{loadingMessage}</div>
        ) : null}
      </>
    );
  } else {
    return (
      <div className="card-container">
        <div className="main-header">
          <h1 className="main-title">Transfer</h1>
        </div>
      </div>
    );
  }
};

export default Transfer;
