import React from "react";

export default function UserRow({ client }) {
  return (
    <>
      <tr>
        <td>
          {client.accountNo} {client.firstName} {client.lastName}
        </td>
        <td>₱{client.balance.toLocaleString()}</td>
      </tr>
    </>
  );
}
