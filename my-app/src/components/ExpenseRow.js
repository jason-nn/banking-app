import React from 'react';
import Button from './Button';

export default function ExpenseRow({ expense, showModal }) {
    return (
        <>
            <tr>
                <td>{expense.description}</td>
                <td>
                    {expense.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                    })}
                </td>
                <td>
                    <Button
                        className='edit-expense-button material-icons'
                        text='edit'
                        onClick={() => showModal(expense)}
                    />
                </td>
            </tr>
        </>
    );
}
