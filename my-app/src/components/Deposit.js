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

  return (
    <div>
      <h1>Deposit</h1>
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
        text="Transfer"
        onClick={() => {
          const amount = parseFloat(amountRef.current.value);
          const account = accountRef.current.value;

          if (!amount) {
            setMessage("Please enter an amount.");
          } else if (amount <= 0) {
            setMessage("Please enter an amount greater than 0.");
          } else {
            setTimeout(() => {
              deposit(amount, account);
            }, 1500);
            setMessage(`Depositing ₱${amount}...`);
          }
        }}
      />
    </div>
  );
};

export default Deposit;
