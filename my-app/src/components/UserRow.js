import React from "react";

export default function UserRow({ client }) {
  return (
    <>
      <tr>
        <td>
          {client.firstName} {client.lastName} <p className="account-number">{client.accountNo}</p>
        </td>
        <td>₱{client.balance.toLocaleString()}</td>
      </tr>
    </>
  );
}
