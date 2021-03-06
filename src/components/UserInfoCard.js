import React from 'react';

export default function UserInfoCard({ currentUser }) {
    return (
        <div className='user-card-container'>
            <div className='user-account-info'>
                <div className='main-header'>
                    <h3 className='main-title'>Your Account</h3>
                </div>
                <div className='user-account-name'>
                    <h3>
                        {currentUser.firstName} {currentUser.lastName}
                    </h3>
                    <h4>{currentUser.accountNo} </h4>
                </div>
            </div>

            <div className='user-account-balance'>
                <div className='main-header'>
                    <h3 className='main-title'>Current Balance</h3>
                </div>
                <h2>
                    {currentUser.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                    })}
                </h2>
            </div>
        </div>
    );
}
