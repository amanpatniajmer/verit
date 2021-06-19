import React, { useEffect } from "react";
import Icon from "../../img/shield.png";
import GoogleSignIn from "./GoogleSignIn";

const Login = ({ setauthenticated, setAdmin, showalert }) => {
  useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <div 
    style = {{ display: 'flex', flexDirection: 'column', placeItems: "center", marginTop: "6vh"}}
    className = "login-main"
    >
      <img src = {Icon} alt = "logo" className = "login-img"/>
      <h1 className = "login-header">Sign in to Verit</h1>
      <div className = "form-container">
        <div className = "center">
          <GoogleSignIn setAuthenticated = {setauthenticated} setAdmin = {setAdmin} showalert = {showalert}/>
        </div>
      </div>
      <p className = "login-instruction">Use your official college ID for login.</p>
    </div>
  );
};

export default Login;
