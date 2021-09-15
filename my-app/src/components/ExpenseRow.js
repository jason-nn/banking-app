import React from "react";
import Button from "./Button";

export default function ExpenseRow({ expense }) {
  return (
    <>
      <tr>
        <td>{expense.description}</td>
        <td>
          {expense.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </td>
        <td>
          <Button className="main-button" text="Edit" />
        </td>
      </tr>
    </>
  );
}
