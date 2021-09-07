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
      <div className="main-header">
        <h1 className="main-title">Transaction History</h1>
      </div>

      <br />
      <br />
      <h2>Deposits</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
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
            <th>Date</th>
            <th>Account</th>
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
            <th>Date</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{renderTransfers()}</tbody>
      </table>
    </div>
  );
}
