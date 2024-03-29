import React, { useState } from 'react';
import './App.css';
import Login from './components/Login.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminView from './components/AdminView';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import Help from './components/Help';

function App() {
    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ];

    // localStorage.clear();

    const [isAdmin, setIsAdmin] = useState(false);

    // list of users (work in progress)
    const userList = [
        {
            accountNo: null,
            firstName: 'ADMINISTRATOR',
            lastName: '',
            balance: null,
            username: 'admin',
            password: 'pass123',
            isAdmin: true,
        },
        {
            accountNo: 111111,
            firstName: 'JUAN',
            lastName: 'DE LA CRUZ',
            balance: 2000,
            username: 'juan',
            password: 'juan23',
            isAdmin: false,
        },
        {
            accountNo: 111112,
            firstName: 'JASON',
            lastName: 'HO',
            balance: 6900,
            username: 'jason',
            password: 'jason123',
            isAdmin: false,
        },
        {
            accountNo: 111113,
            firstName: 'EMAN',
            lastName: 'SIA',
            balance: 4200,
            username: 'eman',
            password: 'eman123',
            isAdmin: false,
        },
    ];

    const transactionList = [
        {
            key: 222221,
            type: 'deposit',
            accountNo: 111111,
            firstName: 'JUAN',
            lastName: 'DE LA CRUZ',
            amount: 2000,
            date: 'SEP 08',
            time: '8:08 PM',
        },
        {
            key: 222222,
            type: 'deposit',
            accountNo: 111112,
            firstName: 'JASON',
            lastName: 'HO',
            amount: 6900,
            date: 'SEP 08',
            time: '8:08 PM',
        },
        {
            key: 222223,
            type: 'deposit',
            accountNo: 111113,
            firstName: 'EMAN',
            lastName: 'SIA',
            amount: 4200,
            date: 'SEP 08',
            time: '8:08 PM',
        },
    ];

    if (localStorage.bankUsers) {
        console.log('bankUsers exists in local storage');
    } else {
        localStorage.bankUsers = JSON.stringify(userList);
        console.log('bankUsers does not exist in local storage, just created.');
    }

    if (localStorage.transactionHistory) {
        console.log('transactionHistory exists in local storage');
    } else {
        localStorage.transactionHistory = JSON.stringify(transactionList);
        console.log(
            'transactionHistory does not exist in local storage, just created.'
        );
    }

    if (localStorage.accountNumber) {
        console.log('accountNumber already exists in local storage.');
    } else {
        localStorage.accountNumber = 111113;
    }

    if (localStorage.transactionKey) {
        console.log('transactionKey already exists in local storage.');
    } else {
        localStorage.transactionKey = 222223;
    }

    if (localStorage.expenseKey) {
        console.log('expenseKey already exists in local storage.');
    } else {
        localStorage.expenseKey = 333330;
    }

    if (localStorage.allExpenses) {
        console.log('allExpenses already exists in local storage.');
    } else {
        localStorage.allExpenses = JSON.stringify([]);
    }

    function formatDate(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function getSuffix(hour, minutes) {
        if (hour === 12 && minutes === 0) {
            return 'NN';
        } else if (hour >= 12) {
            return 'PM';
        } else {
            return 'AM';
        }
    }

    function twelveHour(hour) {
        if (hour > 12) {
            return hour - 12;
        } else if (hour === 0) {
            return 12;
        } else {
            return hour;
        }
    }

    function generateAccountNumber() {
        const oldAccountNumber = parseInt(localStorage.accountNumber);
        const newAccountNumber = oldAccountNumber + 1;
        localStorage.accountNumber = newAccountNumber;
        return newAccountNumber;
    }
    function generateTransactionKey() {
        const oldTransactionKey = parseInt(localStorage.transactionKey);
        const newTransactionKey = oldTransactionKey + 1;
        localStorage.transactionKey = newTransactionKey;
        return newTransactionKey;
    }

    function generateExpenseKey() {
        const oldExpenseKey = parseInt(localStorage.expenseKey);
        const newExpenseKey = oldExpenseKey + 1;
        localStorage.expenseKey = newExpenseKey;
        return newExpenseKey;
    }

    function addUser(firstName, lastName, balance, username, password) {
        const newAccountNumber = generateAccountNumber();

        let newUserList = [
            ...users,
            {
                accountNo: newAccountNumber,
                firstName: firstName,
                lastName: lastName,
                balance: balance,
                username: username,
                password: password,
                isAdmin: false,
            },
        ];
        setUserList(newUserList);
        localStorage.bankUsers = JSON.stringify(newUserList);

        if (balance > 0) {
            const date = new Date();
            const hours = formatDate(twelveHour(date.getHours()));
            const minutes = formatDate(date.getMinutes());
            // const seconds = formatDate(date.getSeconds());
            const month = months[date.getMonth()];
            const day = formatDate(date.getDate());
            const suffix = getSuffix(date.getHours(), date.getMinutes());

            const newTransactions = [
                ...transactions,
                {
                    key: generateTransactionKey(),
                    type: 'deposit',
                    accountNo: newAccountNumber,
                    firstName: firstName,
                    lastName: lastName,
                    amount: balance,
                    date: `${month} ${day}`,
                    time: `${hours}:${minutes} ${suffix}`,
                },
            ];
            setTransactions(newTransactions);
            localStorage.transactionHistory = JSON.stringify(newTransactions);
        }
    }

    function transfer(amount, from, to) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const fromIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(from)
        );
        const toIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(to)
        );
        userCopy[fromIndex].balance -= amount;
        userCopy[toIndex].balance += amount;
        setUserList(userCopy);

        const date = new Date();
        const hours = formatDate(twelveHour(date.getHours()));
        const minutes = formatDate(date.getMinutes());
        // const seconds = formatDate(date.getSeconds());
        const month = months[date.getMonth()];
        const day = formatDate(date.getDate());
        const suffix = getSuffix(date.getHours(), date.getMinutes());

        const newTransactions = [
            ...transactions,
            {
                key: generateTransactionKey(),
                type: 'transfer',
                from: from,
                fromFirstName: userCopy[fromIndex].firstName,
                fromLastName: userCopy[fromIndex].lastName,
                to: to,
                toFirstName: userCopy[toIndex].firstName,
                toLastName: userCopy[toIndex].lastName,
                amount: amount,
                date: `${month} ${day}`,
                time: `${hours}:${minutes} ${suffix}`,
            },
        ];
        setTransactions(newTransactions);
        localStorage.transactionHistory = JSON.stringify(newTransactions);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    function deposit(amount, account) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const accountIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(account)
        );
        userCopy[accountIndex].balance += amount;
        setUserList(userCopy);

        const date = new Date();
        const hours = formatDate(twelveHour(date.getHours()));
        const minutes = formatDate(date.getMinutes());
        // const seconds = formatDate(date.getSeconds());
        const month = months[date.getMonth()];
        const day = formatDate(date.getDate());
        const suffix = getSuffix(date.getHours(), date.getMinutes());

        const newTransactions = [
            ...transactions,
            {
                key: generateTransactionKey(),
                type: 'deposit',
                accountNo: account,
                firstName: userCopy[accountIndex].firstName,
                lastName: userCopy[accountIndex].lastName,
                amount: amount,
                date: `${month} ${day}`,
                time: `${hours}:${minutes} ${suffix}`,
            },
        ];
        setTransactions(newTransactions);
        localStorage.transactionHistory = JSON.stringify(newTransactions);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    function withdraw(amount, account) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const accountIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(account)
        );
        userCopy[accountIndex].balance -= amount;
        setUserList(userCopy);

        const date = new Date();
        const hours = formatDate(twelveHour(date.getHours()));
        const minutes = formatDate(date.getMinutes());
        // const seconds = formatDate(date.getSeconds());
        const month = months[date.getMonth()];
        const day = formatDate(date.getDate());
        const suffix = getSuffix(date.getHours(), date.getMinutes());

        const newTransactions = [
            ...transactions,
            {
                key: generateTransactionKey(),
                type: 'withdrawal',
                accountNo: account,
                firstName: userCopy[accountIndex].firstName,
                lastName: userCopy[accountIndex].lastName,
                amount: amount,
                date: `${month} ${day}`,
                time: `${hours}:${minutes} ${suffix}`,
            },
        ];
        setTransactions(newTransactions);
        localStorage.transactionHistory = JSON.stringify(newTransactions);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    function addExpense(account, description, amount) {
        const allExpensesCopy = [...allExpenses];

        allExpensesCopy.push({
            account: account,
            description: description,
            amount: parseFloat(amount),
            key: generateExpenseKey(),
        });

        setAllExpenses(allExpensesCopy);
        localStorage.allExpenses = JSON.stringify(allExpensesCopy);

        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const accountIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(account)
        );
        userCopy[accountIndex].balance -= amount;
        setUserList(userCopy);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    const [allExpenses, setAllExpenses] = useState(
        JSON.parse(localStorage.allExpenses)
    );

    const [users, setUserList] = useState(JSON.parse(localStorage.bankUsers));

    //state for user details
    const [currentUser, setUser] = useState(null);

    //state for error message if login failed
    const [error, setError] = useState('');

    const [successfulSignUp, setSuccessfulSignup] = useState('');

    //function for logging in
    // const LoginFunction = (details) => {
    //   console.log(details);
    //   if (
    //     details.username === adminUser.username &&
    //     details.password === adminUser.password
    //   ) {
    //     setUser({
    //       name: adminUser.name,
    //       username: adminUser.username,
    //     });
    //     setError("");
    //   } else {
    //     setError("Login failed. Please try again.");
    //   }
    // };

    // function LoginFunction(usernameInput, passwordInput) {
    //   const usernames = users.map((user) => user.username);
    //   const passwords = users.map((user) => user.password);
    //   const firstNames = users.map((user) => user.firstName);
    //   const lastNames = users.map((user) => user.lastName);

    //   const usernameIndex = usernames.findIndex((i) => i === usernameInput);
    //   const passwordIndex = passwords.findIndex((i) => i === passwordInput);

    //   if (usernameInput === "") {
    //     setError("Please enter a username.");
    //     setTimeout(() => setError(""), 2000);
    //   } else if (passwordInput === "") {
    //     setError("Please enter a password.");
    //     setTimeout(() => setError(""), 2000);
    //   } else if (
    //     usernameIndex === passwordIndex &&
    //     usernameIndex >= 0 &&
    //     passwordIndex >= 0
    //   ) {
    //     setUser({
    //       name: firstNames[usernameIndex] /* + " " + lastNames[usernameIndex] */,
    //       username: usernameInput,
    //     });
    //     setError("");
    //   } else if (usernameIndex === -1) {
    //     setError("User does not exist.");
    //     setTimeout(() => setError(""), 2000);
    //   } else if (usernameIndex >= 0) {
    //     setError("Incorrect password.");
    //     setTimeout(() => setError(""), 2000);
    //   } else {
    //     setError("Login failed. Please try again.");
    //     setTimeout(() => setError(""), 2000);
    //   }
    // }

    //function for logging out
    const Logout = () => {
        setUser(null);
        setIsAdmin(false);
    };

    const [transactions, setTransactions] = useState(
        JSON.parse(localStorage.transactionHistory)
    );

    function editUser(accountNo, firstName, lastName, username, password) {
        const userCopy = [...users];
        const accountNos = userCopy.map((user) => user.accountNo);
        const index = accountNos.findIndex((i) => i === accountNo);

        userCopy[index].firstName = firstName;
        userCopy[index].lastName = lastName;
        userCopy[index].username = username;
        userCopy[index].password = password;

        setUserList(userCopy);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    function editExpense(currentExpense, newDescription, newAmount) {
        const currentKey = currentExpense.key;
        const keys = allExpenses.map((expense) => expense.key);
        const index = keys.findIndex(
            (key) => parseInt(key) === parseInt(currentKey)
        );
        const allExpensesCopy = [...allExpenses];

        const userCopy = [...users];
        const account = currentExpense.account;
        const accountNos = userCopy.map((user) => user.accountNo);
        const userIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(account)
        );

        if (parseFloat(currentExpense.amount) < parseFloat(newAmount)) {
            userCopy[userIndex].balance -=
                parseFloat(newAmount) - parseFloat(currentExpense.amount);
        }

        if (parseFloat(currentExpense.amount) > parseFloat(newAmount)) {
            userCopy[userIndex].balance +=
                parseFloat(currentExpense.amount) - parseFloat(newAmount);
        }

        allExpensesCopy[index].description = newDescription;
        allExpensesCopy[index].amount = parseFloat(newAmount);
        setAllExpenses(allExpensesCopy);
        localStorage.allExpenses = JSON.stringify(allExpensesCopy);
        setUserList(userCopy);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    function deleteExpense(currentExpense) {
        const currentKey = currentExpense.key;
        const keys = allExpenses.map((expense) => expense.key);
        const index = keys.findIndex(
            (key) => parseInt(key) === parseInt(currentKey)
        );
        const allExpensesCopy = [...allExpenses];

        allExpensesCopy.splice(index, 1);

        const userCopy = [...users];
        const account = currentExpense.account;
        const accountNos = userCopy.map((user) => user.accountNo);
        const userIndex = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(account)
        );
        userCopy[userIndex].balance += currentExpense.amount;

        setAllExpenses(allExpensesCopy);
        localStorage.allExpenses = JSON.stringify(allExpensesCopy);
        setUserList(userCopy);
        localStorage.bankUsers = JSON.stringify(userCopy);
    }

    return (
        <div className="body">
            {/* If the user info is not blank, show dashboard */}
            {currentUser ? (
                <Router>
                    <Navbar LogoutFunction={Logout} isAdmin={isAdmin} />
                    <div className="main-content">
                        <Switch>
                            <Route
                                path="/banking-app"
                                exact
                                component={() => (
                                    <AdminView
                                        currentUser={currentUser}
                                        users={users}
                                        addUser={(
                                            firstName,
                                            lastName,
                                            balance,
                                            username,
                                            password
                                        ) => {
                                            addUser(
                                                firstName,
                                                lastName,
                                                balance,
                                                username,
                                                password
                                            );
                                        }}
                                        isAdmin={isAdmin}
                                        addExpense={(
                                            account,
                                            expense,
                                            amount
                                        ) =>
                                            addExpense(account, expense, amount)
                                        }
                                        allExpenses={allExpenses}
                                        deleteExpense={(currentExpense) => {
                                            deleteExpense(currentExpense);
                                        }}
                                        editExpense={(
                                            currentExpense,
                                            newDescription,
                                            newAmount
                                        ) => {
                                            editExpense(
                                                currentExpense,
                                                newDescription,
                                                newAmount
                                            );
                                        }}
                                    />
                                )}
                            />
                            <Route
                                path="/banking-app/deposit"
                                component={() => (
                                    <Deposit
                                        currentUser={currentUser}
                                        users={users}
                                        deposit={(amount, account) => {
                                            deposit(amount, account);
                                        }}
                                        isAdmin={isAdmin}
                                        transactions={transactions}
                                    />
                                )}
                            />
                            <Route
                                path="/banking-app/withdraw"
                                component={() => (
                                    <Withdraw
                                        currentUser={currentUser}
                                        users={users}
                                        withdraw={(amount, account) => {
                                            withdraw(amount, account);
                                        }}
                                        isAdmin={isAdmin}
                                        transactions={transactions}
                                    />
                                )}
                            />
                            <Route
                                path="/banking-app/transfer"
                                component={() => (
                                    <Transfer
                                        currentUser={currentUser}
                                        users={users}
                                        transfer={(amount, from, to) => {
                                            transfer(amount, from, to);
                                        }}
                                        isAdmin={isAdmin}
                                        transactions={transactions}
                                    />
                                )}
                            />
                            <Route
                                path="/banking-app/transactions"
                                component={() => (
                                    <Transactions transactions={transactions} />
                                )}
                                isAdmin={isAdmin}
                            />
                            <Route
                                path="/banking-app/settings"
                                component={() => (
                                    <Settings
                                        currentUser={currentUser}
                                        LogoutFunction={Logout}
                                        users={users}
                                        editUser={(
                                            accountNo,
                                            firstName,
                                            lastName,
                                            username,
                                            password
                                        ) =>
                                            editUser(
                                                accountNo,
                                                firstName,
                                                lastName,
                                                username,
                                                password
                                            )
                                        }
                                        isAdmin={isAdmin}
                                    />
                                )}
                            />
                            <Route path="/banking-app/help">
                                <Help />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            ) : (
                /* If there is no current user, show login page */
                <Login
                    // LoginFunction={LoginFunction}
                    currentUser={currentUser}
                    users={users}
                    error={error}
                    setError={(a) => setError(a)}
                    setUser={(a) => setUser(a)}
                    successfulSignUp={successfulSignUp}
                    setSuccessfulSignup={(a) => setSuccessfulSignup(a)}
                    addUser={(
                        firstName,
                        lastName,
                        balance,
                        username,
                        password
                    ) => {
                        addUser(
                            firstName,
                            lastName,
                            balance,
                            username,
                            password
                        );
                    }}
                    setIsAdmin={(a) => setIsAdmin(a)}
                />
            )}
        </div>
    );
}

export default App;
