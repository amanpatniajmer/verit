import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SVG from "../../img/2144242.png";
import Axios from 'axios';
import GoogleSignIn from "./GoogleSignIn";

const Login = ({ setauthenticated, setAdmin,showAlert }) => {
  console.log(window.gapi)
  useEffect(() => {
    localStorage.clear();
  }, [])

  const [user, setUser] = useState({
    email: "aman.jain.phy17@itbhu.ac.in",
    password: "amanjain"
  });

  function togglePass() {
    var a = document.getElementById('password');
    if (a.type === "password") {
      a.type = "text";
    }
    else {
      a.type = "password";
    }
  }

  const { email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      showAlert("Please fill in all fields", "danger");
    }
    else if(!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)){
      showAlert('Email not correct. Enter institute email address.', "danger");
    }
    else {

      let formdata = new FormData(e.target);
      let object = {};

      formdata.forEach(function(value, key){
        object[key] = value;
      });

      Axios.post('http://localhost:5000/api/login', object)
      .then((res) => {
        localStorage.setItem("token",res.data.token);
        res.data.admin===true ? localStorage.setItem("adminState","true")
        :localStorage.setItem("adminState","false");
        localStorage.setItem("name",res.data.name);
        localStorage.setItem("email",res.data.email);
        localStorage.setItem("roll",res.data.roll);
        setUser({
          email: "",
          password: "",
        });
        setAdmin(res.data.admin);
        setauthenticated(true);
        showAlert(`Welcome ${res.data.name}`, "success");
        console.log(typeof(showAlert))
      })
      .catch(() => {
        showAlert("Enter correct username/password", "danger");
      })
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div style={{ display: "flex", marginTop: "56px", justifyItems: "center", alignItems: "center", placeItems: "center" }}>

      <img src={SVG} alt="" className="main-img" />
      <div className="form-container">
        <form onSubmit={onSubmit}>
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
        </form>
        <div className="text-center">
          <GoogleSignIn setAuthenticated={setauthenticated}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
