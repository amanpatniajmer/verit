import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Register = ({ showAlert }) => {

  const history= useHistory();
  const [user, setUser] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
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

  const { name, roll, email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || roll === "" || email === "" || password === "") {
      showAlert("Please fill in all fields", "danger");
    }
    else if(!roll.match(/[0-9]{8}/)){
      showAlert("Roll not correct", "danger");
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

      Axios.post('http://localhost:5000/api/register', object)
      .then(() => {
        // console.log(res.data)
        showAlert("Registration successful", "danger");
        setUser({
          name: "",
          roll: "",
          email: "",
          password: "",
        });
        history.push('./');
        })
      .catch(() => {
        // console.log(e); console.log(res)
        showAlert("Error.", "danger");
      })
    }
  };
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div>
      <form onSubmit = {onSubmit} className = "form-container">
        <h1 className = "text-primary">
          {" "}
          <span className = "text-dark">Account</span> Register{" "}
        </h1>

        <div className = "form-group">
          <label>Full Name</label>
          <input
            type = "text"
            name = "name"
            value = {name}
            placeholder = "Enter name"
            onChange = {onChange}
            autoComplete = "off"
            required
          />
        </div>

        <div className = "form-group">
          <label>Roll No.</label>
          <input
            type = "text"
            name = "roll"
            value = {roll}
            placeholder = "Enter roll no."
            onChange = {onChange}
            autoComplete = "off"
            required
          />
        </div>

        <div className = "form-group">
          <label>Email Address</label>
          <input
            type = "text"
            name = "email"
            value = {email}
            placeholder = "Enter email"
            onChange = {onChange}
            autoComplete = "off"
            required
          />
        </div>

        <div className = "form-group">
          <label>Password</label>
          <input id = "password"
            type = "password"
            name = "password"
            value = {password}
            placeholder = "Enter password"
            onChange = {onChange}
            minLength = "6"
            maxLength = "12"
            autoComplete = "off"
            required
          />
        </div>
        <label>Show Password{"  "}</label>
        <input type = "checkbox" style = {{ width:"auto" }} onClick={() => togglePass()}/>

        <input
          type = "submit"
          value = "Register"
          className = "btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
