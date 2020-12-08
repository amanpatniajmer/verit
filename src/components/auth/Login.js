import React, { useState } from "react";
import SVG from "../../img/2144242.png";
import { useHistory } from "react-router-dom";

const Login = ({setauthenticated}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      // console.log("Logged In");
      setauthenticated(true);
      history.push('/');
      setUser({
        email: "",
        password: "",
      });
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div style={{ display: "flex", marginTop: "56px", justifyItems: "center", alignItems: "center", placeItems: "center"}}>

      <img src={SVG} alt="" className="main-img"/>
      
      <form onSubmit={onSubmit} className="form-container">
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
          <input
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

        <input
          type="submit"
          value="Log In"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Login;
