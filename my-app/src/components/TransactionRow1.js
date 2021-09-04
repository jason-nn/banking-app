import React from "react";

export default function TransactionRow1({ transaction }) {
  return (
    <>
      <tr>
        <td>{transaction.accountNo}</td>
        <td>{transaction.firstName}</td>
        <td>{transaction.lastName}</td>
        <td>₱{transaction.amount}</td>
      </tr>
    </>
  );
}
