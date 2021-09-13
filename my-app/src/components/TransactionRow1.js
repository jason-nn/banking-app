import React from "react";

export default function TransactionRow1({ transaction }) {
  return (
    <>
      <tr>
        <td>
          <p className="transaction-date">{transaction.date}</p>{" "}
          <p className="transaction-time">{transaction.time}</p>
        </td>
        <td>
          {transaction.firstName} {transaction.lastName}{" "}
          <p className="account-number">{transaction.accountNo}</p>
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
