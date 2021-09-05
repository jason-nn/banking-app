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
    <div>
      <h1>Deposit</h1>
      <br />
      <br />
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
        <label>
          <div>Amount</div>
          ₱<input type="number" ref={amountRef} />
        </label>
        <br />
        <br />
        <label>
          <div>Account</div>
          <select
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
        <Button text="Deposit" />
      </form>
    </div>
  );
};

export default Deposit;
