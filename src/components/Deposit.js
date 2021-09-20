import React, { useRef, useState, useEffect } from 'react';
import SelectOptions from './SelectOptions';
import Button from './Button';
import UserInfoCard from './UserInfoCard';
import TransactionRow3 from './TransactionRow3';

const Deposit = ({ currentUser, users, deposit, isAdmin, transactions }) => {
    const nonAdminUsers = users.filter((user) => !user.isAdmin);

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
    const accountRef = useRef();

    const [message, setMessage] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);

    const accountNos = users.map((user) => user.accountNo);
    const index = accountNos.findIndex(
        (accountNo) => parseInt(accountNo) === 111111
    );
    const juanbalance = users[index].balance;

    const [displayBalance, setDisplayBalance] = useState(juanbalance);

    function handleChange(userToDisplay) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const index = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(userToDisplay)
        );

        setDisplayBalance(userCopy[index].balance);
    }

    const deposits = transactions.filter(
        (transaction) =>
            transaction.type === 'deposit' &&
            transaction.accountNo === currentUser.accountNo
    );

    function renderHistory() {
        const rows = [];
        for (let i = 0; i < deposits.length; i++) {
            rows.push(
                <TransactionRow3
                    key={deposits[i].key}
                    transaction={deposits[i]}
                />
            );
        }
        return rows;
    }

    const [displayHistory, setDisplayHistory] = useState(false);

    function checkTransactions() {
        const deposits = transactions.filter(
            (transaction) =>
                transaction.type === 'deposit' &&
                transaction.accountNo === currentUser.accountNo
        );

        if (deposits.length > 0) {
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
                <div className='card-container'>
                    <div className='main-header'>
                        <h1 className='main-title'>Deposit</h1>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const amount = parseFloat(amountRef.current.value);
                            const account = accountRef.current.value;

                            if (amount <= 0) {
                                setMessage(
                                    'Please enter an amount greater than 0.'
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (!amount) {
                                setMessage('Please enter an amount.');
                                setTimeout(() => setMessage(null), 2000);
                            } else {
                                setTimeout(() => {
                                    deposit(amount, account);
                                }, 1500);
                                setLoadingMessage(
                                    `Depositing ${amount.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }
                                    )}...`
                                );
                                // setTimeout(() => setLoadingMessage(null), 2000);
                            }
                        }}
                    >
                        <div className='transaction-form'>
                            <label>
                                <div className='input-label'>Account</div>
                                <select
                                    className='input-field'
                                    ref={accountRef}
                                    onChange={(e) => {
                                        handleChange(e.target.value);
                                    }}
                                >
                                    {renderSelectOptions()}
                                </select>
                                <div className='current-balance'>
                                    Current Balance:{' '}
                                    {displayBalance.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'PHP',
                                    })}
                                </div>
                            </label>

                            <label>
                                <div className='input-label'>Amount (₱)</div>

                                <input
                                    className='input-field'
                                    type='number'
                                    ref={amountRef}
                                    step='.01'
                                />
                            </label>
                        </div>

                        <Button className='main-button' text='Deposit' />
                    </form>
                </div>
                {message !== null ? (
                    <div className='error-box'>{message}</div>
                ) : (
                    ''
                )}
                {loadingMessage !== null ? (
                    <div className='loading-box'>{loadingMessage}</div>
                ) : null}
            </>
        );
    } else {
        return (
            <>
                <UserInfoCard currentUser={currentUser} />

                <br />
                <br />

                <div className='card-container'>
                    <div className='main-header'>
                        <h1 className='main-title'>Deposit</h1>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const amount = parseFloat(amountRef.current.value);
                            const account = currentUser.accountNo;

                            if (amount <= 0) {
                                setMessage(
                                    'Please enter an amount greater than 0.'
                                );
                                setTimeout(() => setMessage(null), 2000);
                            } else if (!amount) {
                                setMessage('Please enter an amount.');
                                setTimeout(() => setMessage(null), 2000);
                            } else {
                                setTimeout(() => {
                                    deposit(amount, account);
                                }, 1500);
                                setLoadingMessage(
                                    `Depositing ${amount.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }
                                    )}...`
                                );
                                // setTimeout(() => setLoadingMessage(null), 2000);
                            }
                        }}
                    >
                        <div className='user-transaction-form'>
                            <label>
                                <div className='input-label'>Amount (₱)</div>
                                <input
                                    className='input-field'
                                    type='number'
                                    ref={amountRef}
                                    step='.01'
                                />
                            </label>
                        </div>

                        <Button className='main-button' text='Deposit' />
                    </form>
                </div>

                {message !== null ? (
                    <div className='error-box'>{message}</div>
                ) : (
                    ''
                )}
                {loadingMessage !== null ? (
                    <div className='loading-box'>{loadingMessage}</div>
                ) : null}

                <br />
                <br />

                <div className='card-container'>
                    <div className='main-header'>
                        <h1 className='main-title'>
                            {displayHistory
                                ? 'Deposit History'
                                : 'No Existing Deposits'}
                        </h1>
                    </div>
                    {displayHistory ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
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

export default Deposit;
