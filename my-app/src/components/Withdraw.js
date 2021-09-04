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

  return (
    <div>
      <h1>Withdraw</h1>
      <br />
      <br />
      <label>
        <div>Amount</div>
        ₱<input type="number" ref={amountRef} />
      </label>
      <br />
      <br />
      <label>
        <div>Account</div>
        <select ref={accountRef}>{renderSelectOptions()}</select>
      </label>
      <br />
      <br />
      <div>{message}</div>
      <Button
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
