import "./AdminView.css";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import UserRow from "./UserRow";
import UserInfoCard from "./UserInfoCard";
import ExpenseRow from "./ExpenseRow";
import ExpenseRow2 from "./ExpenseRow2";
import Chart from "react-google-charts";

const AdminView = ({
    currentUser,
    users,
    addUser,
    isAdmin,
    addExpense,
    allExpenses,
    editExpense,
    deleteExpense,
}) => {
    const nonAdminUsers = users.filter((user) => !user.isAdmin);

    function renderRows() {
        const rows = [];
        for (let i = 0; i < nonAdminUsers.length; i++) {
            rows.push(
                <UserRow
                    key={nonAdminUsers[i].accountNo}
                    client={nonAdminUsers[i]}
                />
            );
        }
        return rows;
    }

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const balanceRef = useRef();

    const descriptionRef = useRef();
    const amountRef = useRef();

    const [error, setError] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);

    const expenses = allExpenses.filter(
        (expense) =>
            parseInt(expense.account) === parseInt(currentUser.accountNo)
    );

    function renderExpenses() {
        const rows = [];
        for (let i = 0; i < expenses.length; i++) {
            rows.push(
                <ExpenseRow
                    key={expenses[i].key}
                    expense={expenses[i]}
                    showModal={(expense) => showModal(expense)}
                />
            );
        }
        return rows;
    }

    const [displayExpenses, setDisplayExpenses] = useState(false);

    function checkExpenses() {
        const expenses = allExpenses.filter(
            (expense) =>
                parseInt(expense.account) === parseInt(currentUser.accountNo)
        );

        if (expenses.length > 0) {
            setDisplayExpenses(true);
        } else {
            setDisplayExpenses(false);
        }
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            checkExpenses();
        }
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            checkExpenses();
        }
        return () => {
            mounted = false;
        };
    }, [allExpenses]);

    const [displayModal, setDisplayModal] = useState(false);

    const [currentExpense, setCurrentExpense] = useState(null);

    const [newDescription, setNewDescription] = useState(null);
    const [newAmount, setNewAmount] = useState(null);

    function showModal(expense) {
        console.log(expense);
        setCurrentExpense(expense);
        setNewDescription(expense.description);
        setNewAmount(expense.amount);
        setDisplayModal(true);
    }

    // ORGANIZING EXPENSES
    const organizedExpenses = [];
    let total = 0;
    let key = 0;

    for (const expense of expenses) {
        const description = expense.description;
        const descriptions = organizedExpenses.map((i) => i.description);
        const index = descriptions.findIndex((i) => i === description);
        if (index === -1) {
            organizedExpenses.push({
                key,
                description,
                amount: expense.amount,
            });
            key += 1;
        } else {
            organizedExpenses[index].amount += expense.amount;
        }
        total += expense.amount;
    }

    organizedExpenses.push({ key, description: "TOTAL", amount: total });

    for (const i of organizedExpenses) {
        i["percentage"] = (i.amount / total) * 100;
    }

    const chartExpenses = [...organizedExpenses];
    chartExpenses.pop();

    const chartData = [["Expense", "Amount Spent"]];

    for (const i of chartExpenses) {
        const temp = [];
        temp.push(i.description);
        temp.push(i.amount);
        chartData.push(temp);
    }

    function renderSummary() {
        const rows = [];
        for (let i = 0; i < organizedExpenses.length; i++) {
            rows.push(
                <ExpenseRow2
                    key={organizedExpenses[i].key}
                    expense={organizedExpenses[i]}
                />
            );
        }
        return rows;
    }

    if (isAdmin) {
        return (
            <>
                <h3 className="greeting-text">
                    Welcome,{" "}
                    <p className="greeting-name">{currentUser.firstName}</p>
                </h3>
                <div className="admin-dashboard">
                    <div className="card-container">
                        <div className="main-header">
                            <h1 className="main-title">Add an account</h1>
                        </div>
                        <form
                            className="account-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const firstName =
                                    firstNameRef.current.value.toUpperCase();
                                const lastName =
                                    lastNameRef.current.value.toUpperCase();
                                const username = usernameRef.current.value;
                                const password = passwordRef.current.value;
                                const balance = parseFloat(
                                    balanceRef.current.value
                                );

                                const firstNames = users.map(
                                    (user) => user.firstName
                                );
                                const lastNames = users.map(
                                    (user) => user.lastName
                                );
                                const usernames = users.map(
                                    (user) => user.username
                                );

                                const firstNameIndex = firstNames.findIndex(
                                    (value) => value === firstName
                                );
                                const lastNameIndex = lastNames.findIndex(
                                    (value) => value === lastName
                                );
                                const usernameIndex = usernames.findIndex(
                                    (users) => users === username
                                );

                                console.log(usernameIndex);

                                if (
                                    !firstName ||
                                    !lastName ||
                                    !username ||
                                    !password ||
                                    !balance
                                ) {
                                    setError(
                                        "Incomplete information. Please fill in all fields."
                                    );
                                    setTimeout(() => setError(null), 2000);
                                } else if (usernameIndex >= 0) {
                                    setError("Username has been taken.");
                                    setTimeout(() => setError(null), 2000);
                                    usernameRef.current.value = null;
                                } else if (
                                    firstNameIndex === lastNameIndex &&
                                    firstNameIndex >= 0
                                ) {
                                    setError("User already exists");
                                    setTimeout(() => setError(null), 2000);
                                    firstNameRef.current.value = null;
                                    lastNameRef.current.value = null;
                                    usernameRef.current.value = null;
                                    passwordRef.current.value = null;
                                    balanceRef.current.value = null;
                                } else if (balance <= 0) {
                                    setError(
                                        "Please enter an amount greater than 0."
                                    );
                                    setTimeout(() => setError(null), 2000);
                                    balanceRef.current.value = null;
                                } else {
                                    if (
                                        firstName.match(/^[A-Za-z]+$/) &&
                                        lastName.match(/^[A-Za-z]+$/)
                                    ) {
                                        setLoadingMessage(
                                            "Creating account..."
                                        );
                                        setTimeout(() => {
                                            addUser(
                                                firstName,
                                                lastName,
                                                balance,
                                                username,
                                                password
                                            );
                                            setLoadingMessage(null);
                                            setError(null);
                                        }, 2000);
                                    } else {
                                        setError(
                                            "Please use letters only for first name and last name"
                                        );
                                        setTimeout(() => setError(null), 2000);
                                    }
                                }
                            }}
                        >
                            <div className="transaction-form">
                                <label>
                                    <div className="input-label">
                                        First Name
                                    </div>
                                    <input
                                        type="text"
                                        ref={firstNameRef}
                                        className="input-field"
                                    />
                                </label>
                                <label>
                                    <div className="input-label">Last Name</div>
                                    <input
                                        type="text"
                                        ref={lastNameRef}
                                        className="input-field"
                                    ></input>
                                </label>
                                <label>
                                    <div className="input-label">Username</div>
                                    <input
                                        type="text"
                                        ref={usernameRef}
                                        className="input-field"
                                    ></input>
                                </label>
                                <label>
                                    <div className="input-label">Password</div>
                                    <input
                                        type="text"
                                        ref={passwordRef}
                                        className="input-field input-password"
                                    ></input>
                                </label>
                                <label>
                                    <div className="input-label">
                                        Balance (₱)
                                    </div>
                                    <input
                                        type="number"
                                        ref={balanceRef}
                                        className="input-field"
                                        step=".01"
                                    ></input>
                                </label>
                            </div>

                            <Button className="main-button" text="Add User" />
                        </form>
                    </div>
                    {error !== null ? (
                        <div className="error-box">{error}</div>
                    ) : (
                        ""
                    )}
                    {loadingMessage !== null ? (
                        <div className="loading-box">{loadingMessage}</div>
                    ) : (
                        ""
                    )}

                    <br />
                    <br />
                    <div className="card-container">
                        <div className="main-header">
                            <h1 className="main-title">Accounts</h1>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>{renderRows()}</tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h3 className="greeting-text">
                    Welcome,{" "}
                    <p className="greeting-name">{currentUser.firstName}</p>
                </h3>

                <UserInfoCard currentUser={currentUser} />

                <br />
                <br />

                <div className="card-container">
                    <div className="main-header">
                        <h1 className="main-title">Add an expense</h1>
                    </div>
                    <form
                        className="account-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const account = currentUser.accountNo;
                            const description = descriptionRef.current.value;
                            const amount = amountRef.current.value;

                            if (!description || !amount) {
                                setError(
                                    "Incomplete information. Please fill in all fields."
                                );
                                setTimeout(() => setError(null), 2000);
                            } else {
                                setLoadingMessage("Adding expense...");
                                setTimeout(() => {
                                    addExpense(account, description, amount);
                                }, 2000);
                            }
                        }}
                    >
                        <div className="transaction-form">
                            <label>
                                <div className="input-label">Expense</div>
                                <input
                                    type="text"
                                    ref={descriptionRef}
                                    className="input-field"
                                />
                            </label>
                            <label>
                                <div className="input-label">Amount (₱)</div>
                                <input
                                    type="number"
                                    ref={amountRef}
                                    className="input-field"
                                    step=".01"
                                ></input>
                            </label>
                        </div>

                        <Button className="main-button" text="Add Expense" />
                    </form>
                </div>
                {error !== null ? <div className="error-box">{error}</div> : ""}
                {loadingMessage !== null ? (
                    <div className="loading-box">{loadingMessage}</div>
                ) : (
                    ""
                )}

                <br />
                <br />

                <div className="card-container">
                    <div className="main-header">
                        <h1 className="main-title">
                            {displayExpenses
                                ? "All Expenses"
                                : "No Existing Expenses"}
                        </h1>
                    </div>
                    {displayExpenses ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{renderExpenses()}</tbody>
                        </table>
                    ) : null}
                </div>
                <br />
                <br />
                {displayExpenses ? (
                    <div className="summary-card-container">
                        <div className="summary-container">
                            <div className="main-header">
                                <h1 className="main-title">Expense Summary</h1>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Expense</th>
                                        <th>Total Amount</th>
                                        <th>Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>{renderSummary()}</tbody>
                            </table>
                        </div>
                        <div className="chart-container">
                            <div className="main-header">
                                <h1 className="main-title">Expense Chart</h1>
                            </div>
                            <Chart
                                width={"100%"}
                                height={"250px"}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={chartData}
                                options={{
                                    backgroundColor: "none",
                                    pieHole: 0.7,
                                    animation: {
                                        startup: true,
                                        easing: "in",
                                        duration: 1500,
                                    },
                                    chartArea: {
                                        width: "70%",
                                        height: "70%",
                                    },
                                    colors: [
                                        "#f0b549",
                                        "#b94247",
                                        "#7d96b3",
                                        "#a87e30",
                                        "#9c373c",
                                    ],
                                    pieSliceTextStyle: {
                                        color: "#e0e9ef",
                                    },
                                    pieSliceBorderColor: "#3f394a",
                                    pieSliceText: "none",
                                    legend: {
                                        position: "right",
                                        maxLines: 5,
                                        alignment: "center",
                                        textStyle: { color: "white" },
                                    },
                                }}
                                rootProps={{ "data-testid": "2" }}
                            />
                        </div>
                    </div>
                ) : null}

                {displayModal ? (
                    <div className="modal-container">
                        <div className="modal-box">
                            <div className="faq-header">
                                <Button
                                    onClick={() => setDisplayModal(false)}
                                    className="close-button material-icons"
                                    text="close"
                                />
                                <h1 className="main-title">Edit expense</h1>
                            </div>
                            <form
                                className="transaction-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    editExpense(
                                        currentExpense,
                                        newDescription,
                                        newAmount
                                    );
                                }}
                            >
                                <label>
                                    <div className="input-label">
                                        Description
                                    </div>
                                    <input
                                        type="text"
                                        value={newDescription}
                                        className="input-field"
                                        onChange={(e) => {
                                            setNewDescription(e.target.value);
                                        }}
                                    />
                                </label>
                                {/* <div>{newDescription}</div> */}

                                <label>
                                    <div className="input-label">
                                        Amount (₱)
                                    </div>
                                    <input
                                        type="number"
                                        value={newAmount}
                                        step=".01"
                                        className="input-field"
                                        onChange={(e) => {
                                            setNewAmount(e.target.value);
                                        }}
                                    />
                                </label>
                                {/* <div>{newAmount}</div> */}

                                <div className="button-container">
                                    <Button
                                        className="main-button"
                                        text="Confirm"
                                    />
                                    <Button
                                        className="secondary-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteExpense(currentExpense);
                                        }}
                                        text="Delete"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
};

export default AdminView;
