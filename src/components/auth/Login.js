import React, { useEffect, /* useState */ } from "react";
/* import { Link } from "react-router-dom"; */
import SVG from "../../img/2144242.png";
/* import Axios from 'axios'; */
import GoogleSignIn from "./GoogleSignIn";

const Login = ({ setauthenticated, setAdmin,showalert }) => {
  useEffect(() => {
    localStorage.clear();
  }, [])

  /* const [user, setUser] = useState({
    email: "aman.jain.phy17@itbhu.ac.in",
    password: "amanjain"
  }); */

  /* function togglePass() {
    var a = document.getElementById('password');
    if (a.type === "password") {
      a.type = "text";
    }
    else {
      a.type = "password";
    }
  } */

  /* const { email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value }); */

  return (
    <div style={{ display: "flex", marginTop: "56px", justifyItems: "center", alignItems: "center", placeItems: "center"}}>

      <img src={SVG} alt="" className="main-img" />
      <div className="form-container">
        {/* <form onSubmit={onSubmit}>
          <h1 className="text-primary">
            {" "}
            <span className="text-dark">User</span> Login{" "}
          </h1>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              minLength="6"
              maxLength="12"
              autoComplete="off"
              required
            />
          </div>
          <label>Show Password{"  "}</label>
          <input type="checkbox" style={{ width: "auto" }} onClick={() => togglePass()} />

          <input
            type="submit"
            value="Log In"
            className="btn btn-block btn-primary"
          />
          <Link to={`/forgotpassword?email=${email}`}>Forgot Password</Link>
        </form> */}
        <div className="center">
          <GoogleSignIn setAuthenticated={setauthenticated} setAdmin={setAdmin} showalert={showalert}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
