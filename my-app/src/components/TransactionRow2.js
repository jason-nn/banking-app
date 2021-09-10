import React from "react";

export default function TransactionRow2({ transaction }) {
  return (
    <>
      <tr>
        <td>
          {transaction.date} <p className="account-number">{transaction.time}</p>
        </td>
        <td>
          {transaction.fromFirstName}{" "}
          {transaction.fromLastName}<p className="account-number">{transaction.from}</p>
        </td>

        <td>
          {transaction.toFirstName} {transaction.toLastName}<p className="account-number">{transaction.to}</p>
        </td>

        <td>₱{transaction.amount.toLocaleString()}</td>
      </tr>
    </>
  );
}
