import React from "react";

export default function SelectOptions({ client }) {
  return (
    <>
      <option value={client.accountNo}>
        {client.firstName} {client.lastName} ({client.accountNo})
      </option>
    </>
  );
}
