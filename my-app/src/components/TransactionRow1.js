import React from "react";

export default function TransactionRow1({ transaction }) {
  return (
    <>
      <tr>
        <td>
          {transaction.date} {transaction.time}
        </td>
        <td>
          {transaction.accountNo} {transaction.firstName} {transaction.lastName}
        </td>
        <td>₱{transaction.amount.toLocaleString()}</td>
      </tr>
    </>
  );
}
