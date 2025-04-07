import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="./">
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
            <Link className="main-nav-item" to="./user">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
            <div className="main-nav-item" onClick={onLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </div>
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
