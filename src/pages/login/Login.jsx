import React, { useState } from "react";
import "./login.scss";
import userService from "../../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginUser = async (e) => {
    e.preventDefault();
    let token = null;
    let user = null;
    try {
      // connexion de recupération du token
      const resultToken = await userService.login(email, password);
      token = resultToken.data.body.token;
      // Récupération des infos utilisateur
      const resultUser = await userService.getProfile(token);
      user = resultUser.data.body;
      // enregistrer le token et le user dans le store
      dispatch(
        setUser({
          token: token,
          user: user,
        })
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onLoginUser}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className={
              !email || !password ? "sign-in-button-disable" : "sign-in-button"
            }
            type="submit"
            disabled={!email || !password}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
