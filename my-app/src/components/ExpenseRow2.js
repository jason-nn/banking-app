import React from "react";

export default function ExpenseRow2({ expense }) {
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
                <td>{expense.percentage.toFixed(2)}%</td>
            </tr>
        </>
    );
}
