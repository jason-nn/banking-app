import React, { useState, useEffect } from "react";
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

  const [displayDeposits, setDisplayDeposits] = useState(false);
  const [displayWithdrawals, setDisplayWithdrawals] = useState(false);
  const [displayTransfers, setDisplayTransfers] = useState(false);

  function checkTransactions() {
    const deposits = transactions.filter(
      (transaction) => transaction.type === "deposit"
    );
    const withdrawals = transactions.filter(
      (transaction) => transaction.type === "withdrawal"
    );
    const transfers = transactions.filter(
      (transaction) => transaction.type === "transfer"
    );

    if (deposits.length > 0) {
      setDisplayDeposits(true);
    } else {
      setDisplayDeposits(false);
    }
    if (withdrawals.length > 0) {
      setDisplayWithdrawals(true);
    } else {
      setDisplayWithdrawals(false);
    }
    if (transfers.length > 0) {
      setDisplayTransfers(true);
    } else {
      setDisplayTransfers(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      checkTransactions();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      checkTransactions();
    }
    return () => {
      mounted = false;
    };
  }, [transactions]);

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
      <div className="card-container">
        <div className="main-header">
          <h1 className="main-title">
            {displayDeposits ? "Deposits" : "No Existing Deposits"}
          </h1>
        </div>
        {displayDeposits ? (
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
        ) : null}
      </div>
      <br />
      <br />
      <div className="card-container">
        <div className="main-header">
          <h1 className="main-title">
            {displayWithdrawals ? "Withdrawals" : "No Existing Withdrawals"}
          </h1>
        </div>
        {displayWithdrawals ? (
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
        ) : null}
      </div>
      <br />
      <br />
      <div className="card-container">
        <div className="main-header">
          <h1 className="main-title">
            {displayTransfers ? "Transfers" : "No Existing Transfers"}
          </h1>
        </div>
        {displayTransfers ? (
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
        ) : null}
      </div>
    </div>
  );
}
