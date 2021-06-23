import React, { useEffect } from "react";
import Icon from "../../img/shield.png";
import GoogleSignIn from "./GoogleSignIn";

const Login = ({ setauthenticated, setAdmin, showalert, setActive }) => {

  useEffect(() => {
    setActive("Login");
    localStorage.clear();
    //eslint-disable-next-line
  }, [])

  return (
    <div className = "login-main">
      <img src = {Icon} alt = "logo" className = "login-img"/>
      <h1 className = "login-header">Sign in to Verit</h1>
      <div className = "google-form-container">
          <GoogleSignIn setAuthenticated = {setauthenticated} setAdmin = {setAdmin} showalert = {showalert}/>
      </div>
      <p className = "login-instruction">Use your official college ID for login.</p>
    </div>
  );
};

export default Login;
