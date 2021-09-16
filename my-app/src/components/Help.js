import React from "react";
import { NavLink } from "react-router-dom";

const Help = () => {
    return (
        <>
            <div className="faq-header">
                <NavLink to="/settings" exact className="close-button">
                    <div className="logout-button-content">
                        <span className="material-icons logout-icon">
                            close
                        </span>
                    </div>
                </NavLink>
                <h3 className="faq-title">Frequently Asked Questions</h3>
            </div>
            <div className="card-container">
                <div className="main-header">
                    <h1 className="main-title">
                        What does <span className="name-logo">banque.</span> do
                        with my money?
                    </h1>
                </div>
                <br />
                <p className="faq-answer">
                    Money is just a social construct. It has no intrinsic value.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc a nisl molestie, pretium eros sit amet, sollicitudin
                    risus. Etiam finibus non libero et faucibus. Aliquam eu
                    neque eu arcu ultrices placerat. Phasellus nec malesuada
                    elit. Sed eu nibh enim.
                </p>
            </div>
            <br />
            <div className="card-container">
                <div className="main-header">
                    <h1 className="main-title">
                        What are the fees when transacting with{" "}
                        <span className="name-logo">banque.</span>?
                    </h1>
                </div>
                <br />
                <p className="faq-answer">
                    <span className="name-logo">banque.</span> does not charge
                    any fees as of the moment.
                </p>
            </div>
            <br />
            <div className="card-container">
                <div className="main-header">
                    <h1 className="main-title">
                        Is there a minimum fee required when opening an account
                        with <span className="name-logo">banque.</span>?
                    </h1>
                </div>
                <br />
                <p className="faq-answer">
                    There is also no initial deposit or minimum balance required
                    to open an account.
                </p>
            </div>
            <br />
            <div className="card-container">
                <div className="main-header">
                    <h1 className="main-title">
                        How do you pronounce{" "}
                        <span className="name-logo">banque.</span>? What does it
                        mean?
                    </h1>
                </div>
                <br />
                <p className="faq-answer">
                    <span className="name-logo">banque.</span> is pronounced as
                    /bɑ̃k/ [bangk]. It means "bank" in French, nothing special.
                </p>
            </div>
        </>
    );
};

export default Help;
