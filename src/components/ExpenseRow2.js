import React from "react";

export default function ExpenseRow2({ expense }) {
    return (
        <>
            <tr className="expense-summary">
                <td>{expense.description}</td>
                <td>
                    {expense.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                    })}
                </td>
                <td>{expense.percentage.toFixed(1)}%</td>
            </tr>
        </>
    );
}
