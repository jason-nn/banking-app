import React from "react";

export default function SelectOptions({ client }) {
  return (
    <>
      <option value={client.accountNo}>
        {client.accountNo} {client.firstName} {client.lastName}
      </option>
    </>
  );
}
