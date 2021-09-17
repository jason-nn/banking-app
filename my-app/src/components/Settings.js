import React from 'react';
import { NavLink } from 'react-router-dom';
import SettingsSelect from './SettingsSelect';
import { useState, useRef } from 'react';
import Button from './Button';

const Settings = ({
    LogoutFunction,
    users,
    editUser,
    isAdmin,
    currentUser,
}) => {
    function renderSelectOptions() {
        const options = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].accountNo) {
                options.push(
                    <SettingsSelect
                        key={users[i].accountNo}
                        client={users[i]}
                    />
                );
            }
        }
        return options;
    }

    const [error, setError] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);

    // const usernameRef = useRef();
    // const newUsernameRef = useRef();
    // const newPasswordRef = useRef();
    // const newPasswordRef2 = useRef();

    const [clientSideFirstName, setClientSideFirstName] = useState(
        currentUser.firstName
    );
    const [clientSideLastName, setClientSideLastName] = useState(
        currentUser.lastName
    );
    const [clientSideUsername, setClientSideUsername] = useState(
        currentUser.username
    );
    const [clientSidePassword, setClientSidePassword] = useState(
        currentUser.password
    );
    const [clientSideConfirmPassword, setClientSideConfirmPassword] = useState(
        currentUser.password
    );

    const [adminSideDisplayUser, setAdminSideDisplayUser] = useState(users[1]);

    const [adminSideFirstName, setAdminSideFirstName] = useState(
        users[1].firstName
    );
    const [adminSideLastName, setAdminSideLastName] = useState(
        users[1].lastName
    );
    const [adminSideUsername, setAdminSideUsername] = useState(
        users[1].username
    );
    const [adminSidePassword, setAdminSidePassword] = useState(
        users[1].password
    );
    const [adminSideConfirmPassword, setAdminSideConfirmPassword] = useState(
        users[1].password
    );

    function handleChange(userToDisplay) {
        const accountNos = users.map((user) => user.accountNo);
        const index = accountNos.findIndex(
            (accountNo) => parseInt(accountNo) === parseInt(userToDisplay)
        );
        const user = users[index];
        setAdminSideDisplayUser(user);
        setAdminSideFirstName(user.firstName);
        setAdminSideLastName(user.lastName);
        setAdminSideUsername(user.username);
        setAdminSidePassword(user.password);
        setAdminSideConfirmPassword(user.password);
    }

    // if (isAdmin) {
    //     return (
    //         <>
    //             <div className="card-container">
    //                 <div className="main-header">
    //                     <h1 className="main-title">Edit users</h1>
    //                 </div>
    //                 <form
    //                     onSubmit={(e) => {
    //                         e.preventDefault();

    //                         const username = usernameRef.current.value;
    //                         const newUsername = newUsernameRef.current.value;
    //                         const newPassword = newPasswordRef.current.value;
    //                         const newPassword2 = newPasswordRef2.current.value;

    //                         if (
    //                             !username ||
    //                             !newUsername ||
    //                             !newPassword ||
    //                             !newPassword2
    //                         ) {
    //                             setError("Please fill out all fields.");
    //                             setTimeout(() => setError(null), 2000);
    //                         } else if (newPassword === newPassword2) {
    //                             setTimeout(() => {
    //                                 editUser(
    //                                     username,
    //                                     newUsername,
    //                                     newPassword
    //                                 );
    //                             }, 2000);
    //                             newUsernameRef.current.value = null;
    //                             newPasswordRef.current.value = null;
    //                             newPasswordRef2.current.value = null;
    //                             setLoadingMessage("Changing details...");
    //                             setTimeout(() => setLoadingMessage(null), 4000);
    //                         } else {
    //                             setError("Passwords do not match. Try again.");
    //                             setTimeout(() => setError(null), 2000);
    //                             newUsernameRef.current.value = null;
    //                             newPasswordRef.current.value = "";
    //                             newPasswordRef2.current.value = "";
    //                         }
    //                     }}
    //                 >
    //                     <div className="transaction-form">
    //                         <label>
    //                             <div className="input-label">Select a user</div>
    //                             <select
    //                                 className="input-field"
    //                                 ref={usernameRef}
    //                             >
    //                                 {renderSelectOptions()}
    //                             </select>
    //                         </label>
    //                         <label>
    //                             <div className="input-label">New username</div>
    //                             <input
    //                                 className="input-field"
    //                                 ref={newUsernameRef}
    //                                 type="text"
    //                             />
    //                         </label>
    //                         <label>
    //                             <div className="input-label">New password</div>
    //                             <input
    //                                 className="input-field"
    //                                 ref={newPasswordRef}
    //                                 type="password"
    //                             />
    //                         </label>
    //                         <label>
    //                             <div className="input-label">
    //                                 Confirm new password
    //                             </div>
    //                             <input
    //                                 className="input-field"
    //                                 ref={newPasswordRef2}
    //                                 type="password"
    //                             />
    //                         </label>
    //                     </div>
    //                     <Button className="main-button" text="Submit" />
    //                 </form>
    //             </div>
    //             {error !== null ? (
    //                 <div className="error-box">{error}</div>
    //             ) : null}
    //             {loadingMessage !== null ? (
    //                 <div className="loading-box">{loadingMessage}</div>
    //             ) : null}
    //             <br />
    //             <hr />

    //             <div className="option-container">
    //                 <NavLink to="/help" exact className="logout-button">
    //                     <div className="logout-button-content">
    //                         <span className="material-icons logout-icon">
    //                             help
    //                         </span>
    //                         <span>Help</span>
    //                     </div>
    //                 </NavLink>
    //                 <NavLink
    //                     to="/"
    //                     exact
    //                     className="logout-button"
    //                     onClick={() => {
    //                         LogoutFunction();
    //                     }}
    //                 >
    //                     <div className="logout-button-content">
    //                         <span className="material-icons logout-icon">
    //                             logout
    //                         </span>
    //                         <span>Logout</span>
    //                     </div>
    //                 </NavLink>
    //             </div>
    //         </>
    //     );
    // } else {

    return (
        <>
            <div className='card-container'>
                <div className='main-header'>
                    <h1 className='main-title'>
                        {isAdmin ? 'Admin' : 'User'} Account Details
                    </h1>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (
                            (!isAdmin &&
                                (clientSideFirstName.length < 1 ||
                                    clientSideLastName.length < 1 ||
                                    clientSideUsername.length < 1 ||
                                    clientSidePassword.length < 1 ||
                                    clientSideConfirmPassword.length < 1)) ||
                            (isAdmin &&
                                (clientSideFirstName.length < 1 ||
                                    clientSideUsername.length < 1 ||
                                    clientSidePassword.length < 1 ||
                                    clientSideConfirmPassword.length < 1))
                        ) {
                            setError('Please fill out all fields.');
                            setTimeout(() => setError(null), 2000);
                        } else if (
                            clientSidePassword === clientSideConfirmPassword
                        ) {
                            setTimeout(() => {
                                editUser(
                                    currentUser.accountNo,
                                    clientSideFirstName.toUpperCase(),
                                    clientSideLastName.toUpperCase(),
                                    clientSideUsername,
                                    clientSidePassword
                                );
                            }, 2000);
                            setLoadingMessage('Changing details...');
                        } else {
                            setError('Passwords do not match. Try again.');
                            setTimeout(() => setError(null), 2000);
                        }
                    }}
                >
                    <div className='form-input-container'>
                        <label>
                            <div className='input-label'>First Name</div>
                            <input
                                className='input-field'
                                type='text'
                                value={clientSideFirstName}
                                onChange={(e) => {
                                    setClientSideFirstName(e.target.value);
                                }}
                            />
                        </label>
                        <label>
                            <div className='input-label'>Last Name</div>
                            <input
                                className='input-field'
                                type='text'
                                value={clientSideLastName}
                                onChange={(e) => {
                                    setClientSideLastName(e.target.value);
                                }}
                            />
                        </label>
                        <label>
                            <div className='input-label'>Username</div>
                            <input
                                className='input-field'
                                type='text'
                                value={clientSideUsername}
                                onChange={(e) => {
                                    setClientSideUsername(e.target.value);
                                }}
                            />
                        </label>
                        <label>
                            <div className='input-label'>Password</div>
                            <input
                                className='input-field'
                                type='password'
                                value={clientSidePassword}
                                onChange={(e) => {
                                    setClientSidePassword(e.target.value);
                                }}
                            />
                        </label>
                        <label>
                            <div className='input-label'>Confirm Password</div>
                            <input
                                className='input-field'
                                type='password'
                                value={clientSideConfirmPassword}
                                onChange={(e) => {
                                    setClientSideConfirmPassword(
                                        e.target.value
                                    );
                                }}
                            />
                        </label>
                    </div>
                    <Button className='main-button' text='Edit' />
                </form>
            </div>

            {isAdmin ? (
                <>
                    <br />
                    <div className='card-container'>
                        <div className='main-header'>
                            <h1 className='main-title'>Edit User Accounts</h1>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (
                                    adminSideFirstName.length < 1 ||
                                    adminSideLastName.length < 1 ||
                                    adminSideUsername.length < 1 ||
                                    adminSidePassword.length < 1 ||
                                    adminSideConfirmPassword.length < 1
                                ) {
                                    setError('Please fill out all fields.');
                                    setTimeout(() => setError(null), 2000);
                                } else if (
                                    adminSidePassword ===
                                    adminSideConfirmPassword
                                ) {
                                    setTimeout(() => {
                                        editUser(
                                            adminSideDisplayUser.accountNo,
                                            adminSideFirstName,
                                            adminSideLastName,
                                            adminSideUsername,
                                            adminSidePassword
                                        );
                                    }, 2000);
                                    setLoadingMessage('Changing details...');
                                } else {
                                    setError(
                                        'Passwords do not match. Try again.'
                                    );
                                    setTimeout(() => setError(null), 2000);
                                }
                            }}
                        >
                            <div className='transaction-form'>
                                <label>
                                    <div className='input-label'>
                                        Select a user
                                    </div>
                                    <select
                                        className='input-field'
                                        onChange={(e) => {
                                            handleChange(e.target.value);
                                        }}
                                    >
                                        {renderSelectOptions()}
                                    </select>
                                </label>

                                <label>
                                    <div className='input-label'>
                                        First Name
                                    </div>
                                    <input
                                        className='input-field'
                                        type='text'
                                        value={adminSideFirstName}
                                        onChange={(e) => {
                                            setAdminSideFirstName(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                                <label>
                                    <div className='input-label'>Last Name</div>
                                    <input
                                        className='input-field'
                                        type='text'
                                        value={adminSideLastName}
                                        onChange={(e) => {
                                            setAdminSideLastName(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                                <label>
                                    <div className='input-label'>Username</div>
                                    <input
                                        className='input-field'
                                        type='text'
                                        value={adminSideUsername}
                                        onChange={(e) => {
                                            setAdminSideUsername(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                                <label>
                                    <div className='input-label'>Password</div>
                                    <input
                                        className='input-field'
                                        type='password'
                                        value={adminSidePassword}
                                        onChange={(e) => {
                                            setAdminSidePassword(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                                <label>
                                    <div className='input-label'>
                                        Confirm Password
                                    </div>
                                    <input
                                        className='input-field'
                                        type='password'
                                        value={adminSideConfirmPassword}
                                        onChange={(e) => {
                                            setAdminSideConfirmPassword(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            <Button className='main-button' text='Edit' />
                        </form>
                    </div>
                </>
            ) : null}

            {error !== null ? <div className='error-box'>{error}</div> : null}
            {loadingMessage !== null ? (
                <div className='loading-box'>{loadingMessage}</div>
            ) : null}
            <br />
            <hr />

            <div className='option-container'>
                <NavLink to='/help' exact className='logout-button'>
                    <div className='logout-button-content'>
                        <span className='material-icons logout-icon'>help</span>
                        <span>Help</span>
                    </div>
                </NavLink>
                <NavLink
                    to='/'
                    exact
                    className='logout-button'
                    onClick={() => {
                        LogoutFunction();
                    }}
                >
                    <div className='logout-button-content'>
                        <span className='material-icons logout-icon'>
                            logout
                        </span>
                        <span>Logout</span>
                    </div>
                </NavLink>
            </div>
        </>
    );
};
// };

export default Settings;
