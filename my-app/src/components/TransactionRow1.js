import React from "react";

export default function TransactionRow1({ transaction }) {
  return (
    <>
      <tr>
        <td>
          {transaction.date} <p className="account-number">{transaction.time}</p>
        </td>
        <td>
          {transaction.firstName} {transaction.lastName} <p className="account-number">{transaction.accountNo}</p>
        </td>
        <td>₱{transaction.amount.toLocaleString()}</td>
      </tr>
    </>
  );
}
