import React from "react";

export default function TransactionRow2({ transaction }) {
  return (
    <>
      <tr>
        <td>{transaction.from}</td>
        <td>{transaction.fromFirstName}</td>
        <td>{transaction.fromLastName}</td>
        <td>{transaction.to}</td>
        <td>{transaction.toFirstName}</td>
        <td>{transaction.toLastName}</td>
        <td>₱{transaction.amount}</td>
      </tr>
    </>
  );
}
