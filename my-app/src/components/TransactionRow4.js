import React from "react";

export default function TransactionRow4({ transaction }) {
  return (
    <>
      <tr>
        <td>
          <p className="transaction-date">{transaction.date}</p>
          <p className="transaction-time">{transaction.time}</p>
        </td>
        <td>
          {transaction.toFirstName} {transaction.toLastName}
          <p className="account-number">{transaction.to}</p>
        </td>

        <td>
          {transaction.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </td>
      </tr>
    </>
  );
}
