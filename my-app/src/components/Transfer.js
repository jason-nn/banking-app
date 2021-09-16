import React, { useRef, useState, useEffect } from "react";
import SelectOptions from "./SelectOptions";
import Button from "./Button";
import UserInfoCard from "./UserInfoCard";
import TransactionRow4 from "./TransactionRow4";

const Transfer = ({ currentUser, users, transfer, isAdmin, transactions }) => {
    const nonAdminUsers = users.filter(
        (user) => !user.isAdmin && user !== currentUser
    );

    function renderSelectOptions() {
        const rows = [];
        for (let i = 0; i < nonAdminUsers.length; i++) {
            rows.push(
                <SelectOptions
                    key={nonAdminUsers[i].accountNo}
                    client={nonAdminUsers[i]}
                />
            );
        }
        return rows;
    }

    const amountRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();

    const [message, setMessage] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);

    const accountNos = users.map((user) => user.accountNo);
    const index = accountNos.findIndex(
        (accountNo) => parseInt(accountNo) === 111111
    );
    const juanbalance = users[index].balance;

    const [displayBalance1, setDisplayBalance1] = useState(juanbalance);
    const [displayBalance2, setDisplayBalance2] = useState(juanbalance);

    function handleChange(userToDisplay, n) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const index = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(userToDisplay)
        );
        n === 1
            ? setDisplayBalance1(userCopy[index].balance)
            : setDisplayBalance2(userCopy[index].balance);
    }

    const transfers = transactions.filter(
        (transaction) =>
            transaction.type === "transfer" &&
            transaction.from === currentUser.accountNo
    );

    function renderHistory() {
        const rows = [];
        for (let i = 0; i < transfers.length; i++) {
            rows.push(
                <TransactionRow4
                    key={transfers[i].key}
                    transaction={transfers[i]}
                />
            );
        }
        return rows;
    }

    const [displayHistory, setDisplayHistory] = useState(false);

    function checkTransactions() {
        const transfers = transactions.filter(
            (transaction) =>
                transaction.type === "transfer" &&
                transaction.from === currentUser.accountNo
        );

        if (transfers.length > 0) {
            setDisplayHistory(true);
        } else {
            setDisplayHistory(false);
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

    if (isAdmin) {
        return (
            <>
                <div className="card-container">
                    <div className="main-header">
                        <h1 className="main-title">Transfer</h1>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const amount = parseFloat(amountRef.current.value);
                            const from = fromRef.current.value;
                            const to = toRef.current.value;

                            const accountNos = users.map(
                                (user) => user.accountNo
                            );
                            const fromIndex = accountNos.findIndex(
                                (accountNo) =>
                                    parseInt(accountNo) === parseInt(from)
                            );
                            const fromBalance = users[fromIndex].balance;

                            if (amount <= 0) {
                                setMessage(
                                    "Please enter an amount greater than 0."
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (!amount) {
                                setMessage("Please enter an amount.");
                                setTimeout(() => setMessage(null), 2000);
                            } else if (from === to) {
                                setMessage(
                                    "Cannot transfer to the same account."
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (fromBalance < amount) {
                                setMessage("Insufficient funds.");
                                setTimeout(() => setMessage(null), 2000);
                            } else {
                                setTimeout(() => {
                                    transfer(amount, from, to);
                                }, 1500);
                                setLoadingMessage(
                                    `Transferring ${amount.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "PHP",
                                        }
                                    )}...`
                                );
                                // setTimeout(() => setLoadingMessage(null), 2000);
                            }
                        }}
                    >
                        <div className="transaction-form">
                            <label>
                                <div className="input-label">From</div>
                                <select
                                    className="input-field"
                                    onChange={(e) => {
                                        handleChange(e.target.value, 1);
                                    }}
                                    ref={fromRef}
                                >
                                    {renderSelectOptions()}
                                </select>
                                <div className="current-balance">
                                    Current Balance:{" "}
                                    {displayBalance1.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </div>
                            </label>

                            <label>
                                <div className="input-label">To</div>
                                <select
                                    className="input-field"
                                    onChange={(e) => {
                                        handleChange(e.target.value, 2);
                                    }}
                                    ref={toRef}
                                >
                                    {renderSelectOptions()}
                                </select>
                                <div className="current-balance">
                                    Current Balance:{" "}
                                    {displayBalance2.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </div>
                            </label>

                            <label>
                                <div className="input-label">Amount (₱)</div>
                                <input
                                    className="input-field"
                                    type="number"
                                    ref={amountRef}
                                    step=".01"
                                />
                            </label>
                            <br />
                        </div>
                        <Button className="main-button" text="Transfer" />
                    </form>
                </div>
                {message !== null ? (
                    <div className="error-box">{message}</div>
                ) : (
                    ""
                )}
                {loadingMessage !== null ? (
                    <div className="loading-box">{loadingMessage}</div>
                ) : null}
            </>
        );
    } else {
        return (
            <>
                <UserInfoCard currentUser={currentUser} />

                <br />
                <br />

                <div className="card-container">
                    <div className="main-header">
                        <h1 className="main-title">Transfer</h1>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const amount = parseFloat(amountRef.current.value);
                            const from = currentUser.accountNo;
                            const to = toRef.current.value;

                            const accountNos = users.map(
                                (user) => user.accountNo
                            );
                            const fromIndex = accountNos.findIndex(
                                (accountNo) =>
                                    parseInt(accountNo) === parseInt(from)
                            );
                            const fromBalance = users[fromIndex].balance;

                            if (amount <= 0) {
                                setMessage(
                                    "Please enter an amount greater than 0."
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (!amount) {
                                setMessage("Please enter an amount.");
                                setTimeout(() => setMessage(null), 2000);
                            } else if (from === to) {
                                setMessage(
                                    "Cannot transfer to the same account."
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (fromBalance < amount) {
                                setMessage("Insufficient funds.");
                                setTimeout(() => setMessage(null), 2000);
                            } else {
                                setTimeout(() => {
                                    transfer(amount, from, to);
                                }, 1500);
                                setLoadingMessage(
                                    `Transferring ${amount.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "PHP",
                                        }
                                    )}...`
                                );
                                // setTimeout(() => setLoadingMessage(null), 2000);
                            }
                        }}
                    >
                        <div className="transaction-form">
                            <label>
                                <div className="input-label">To</div>
                                <select
                                    className="input-field"
                                    onChange={(e) => {
                                        handleChange(e.target.value, 2);
                                    }}
                                    ref={toRef}
                                >
                                    {renderSelectOptions()}
                                </select>
                                <div className="current-balance">
                                    Current Balance:{" "}
                                    {displayBalance2.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </div>
                            </label>

                            <label>
                                <div className="input-label">Amount (₱)</div>
                                <input
                                    className="input-field"
                                    type="number"
                                    ref={amountRef}
                                    step=".01"
                                />
                            </label>
                        </div>
                        <Button className="main-button" text="Transfer" />
                    </form>
                </div>
                {message !== null ? (
                    <div className="error-box">{message}</div>
                ) : (
                    ""
                )}
                {loadingMessage !== null ? (
                    <div className="loading-box">{loadingMessage}</div>
                ) : null}

                <br />
                <br />

                <div className="card-container">
                    <div className="main-header">
                        <h1 className="main-title">
                            {displayHistory
                                ? "Transfer History"
                                : "No Existing Transfers"}
                        </h1>
                    </div>
                    {displayHistory ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Receiver</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>{renderHistory()}</tbody>
                        </table>
                    ) : null}
                </div>
            </>
        );
    }
};

export default Transfer;
