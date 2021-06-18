import React, { useEffect } from "react";
import SVG from "../../img/2144242.png";
import GoogleSignIn from "./GoogleSignIn";

const Login = ({ setauthenticated, setAdmin, showalert }) => {
  useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <div style = {{ display: "flex", marginTop: "56px", justifyItems: "center", alignItems: "center", placeItems: "center"}}>
      <img src = {SVG} alt = "" className = "main-img" />
      <div className = "form-container">
        <div className = "center">
          <GoogleSignIn setAuthenticated = {setauthenticated} setAdmin = {setAdmin} showalert = {showalert}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
