import React from "react";

export default function TransactionRow2({ transaction }) {
  return (
    <>
      <tr>
        <td>
          {transaction.date} {transaction.time}
        </td>
        <td>
          {transaction.from} {transaction.fromFirstName}{" "}
          {transaction.fromLastName}
        </td>

        <td>
          {transaction.to} {transaction.toFirstName} {transaction.toLastName}
        </td>

        <td>₱{transaction.amount}</td>
      </tr>
    </>
  );
}
