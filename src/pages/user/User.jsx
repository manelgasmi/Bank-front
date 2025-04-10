import React, { useState } from "react";
import "./user.scss";
import { useSelector } from "react-redux";
import UserForm from "../../components/user-form/UserForm";

const User = () => {
  // get user from store
  const { user } = useSelector((state) => state.user);
  // State to toggle the visibility of the user form
  const [showForm, setShowForm] = useState(false);

  // handle form submission and hide the form
  const handleEditUser = () => {
    setShowForm(false);
  }
  // toggle the form visibility
  const toggleUserForm = () => {
    setShowForm(!showForm);
  }
  return user ? (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <div style={{ display: showForm ? "block" : "none" }}>
          <UserForm handleEditUser={handleEditUser} />
        </div>
        <button
          style={{ display: !showForm ? "inline" : "none" }}
          className="edit-button"
          onClick={toggleUserForm}
        >
          Edit Name
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  ) : (
    <h2>Loading</h2>
  );
};

export default User;
