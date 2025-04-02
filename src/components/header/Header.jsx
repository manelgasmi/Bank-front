import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="./index.html">
        <img
          className="main-nav-logo-image"
          src="/src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user && (
          <>
            <Link className="main-nav-item" to="./login">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
            <Link className="main-nav-item" to="./login">
              <i className="fa fa-user-circle"></i> Logout
            </Link>
          </>
        )}
        
        {!user && (
        <Link className="main-nav-item" to="./login">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
