import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import User from "../pages/user/User";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/userService";
import { setUser } from "../redux/userSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  // get token from store
  const { token } = useSelector((state) => state.user);

  // when page is reloaded, we must update store by user informations
  const refreshProfile = async () => {
    // get token from local storage
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      const resultUser = await userService.getProfile(tokenFromStorage);
      const user = resultUser.data.body;
      
      dispatch(
        setUser({
          token: tokenFromStorage,
          user: user,
        })
      );
    }
  };
  // refresh profile when the app is loaded
  useEffect(() => {
    refreshProfile();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate replace to="/user" /> : <Login />}
        />
        <Route
          path="/user"
          element={!token ? <Navigate replace to="/login" /> : <User />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
