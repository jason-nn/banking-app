import React from "react";

export default function UserRow({ client }) {
  return (
    <>
      <tr>
        <td>{client.accountNo}</td>
        <td>{client.firstName}</td>
        <td>{client.lastName}</td>
        <td>₱{client.balance.toLocaleString()}</td>
      </tr>
    </>
  );
}
