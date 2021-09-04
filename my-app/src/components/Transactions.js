import React from "react";
import TransactionRow1 from "./TransactionRow1";
import TransactionRow2 from "./TransactionRow2";

export default function Transactions({ transactions }) {
  const deposits = transactions.filter(
    (transaction) => transaction.type === "deposit"
  );
  const withdrawals = transactions.filter(
    (transaction) => transaction.type === "withdrawal"
  );
  const transfers = transactions.filter(
    (transaction) => transaction.type === "transfer"
  );

  function renderDeposits() {
    const rows = [];
    for (let i = 0; i < deposits.length; i++) {
      rows.push(
        <TransactionRow1 key={deposits[i].key} transaction={deposits[i]} />
      );
    }
    return rows;
  }
  function renderWithdrawals() {
    const rows = [];
    for (let i = 0; i < withdrawals.length; i++) {
      rows.push(
        <TransactionRow1
          key={withdrawals[i].key}
          transaction={withdrawals[i]}
        />
      );
    }
    return rows;
  }
  function renderTransfers() {
    const rows = [];
    for (let i = 0; i < transfers.length; i++) {
      rows.push(
        <TransactionRow2 key={transfers[i].key} transaction={transfers[i]} />
      );
    }
    return rows;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <br />
      <br />
      <h2>Deposits</h2>
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{renderDeposits()}</tbody>
      </table>
      <br />
      <br />
      <h2>Withdrawals</h2>
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{renderWithdrawals()}</tbody>
      </table>
      <br />
      <br />
      <h2>Transfers</h2>
      <table>
        <thead>
          <tr>
            <th>Sending Account Number</th>
            <th>Sending First Name</th>
            <th>Sending Last Name</th>
            <th>Receiving Account Number</th>
            <th>Receiving First Name</th>
            <th>Receiving Last Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{renderTransfers()}</tbody>
      </table>
    </div>
  );
}
