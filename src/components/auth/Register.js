import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Register = ({ showalert, setauthenticated, setAdmin }) => {

  const history = useHistory();
  const [user, setUser] = useState({
    roll: ""
  });

  const { roll } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if ( roll === "" ) {
      showalert("Please fill in all fields", "danger");
    }
    else if(!roll.match(/[0-9]{8}/)){
      showalert("Roll not correct", "danger");
    }
    else {
    let formdata = new FormData(e.target);
    let object = {};

    formdata.forEach(function(value, key){
      object[key] = value;
    });

    object['email'] = localStorage.getItem('email');
    object['idtoken'] = localStorage.getItem('idtoken');
    Axios.post(`${process.env.REACT_APP_SERVER}/api/register`, object)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      res.data.admin === true ? localStorage.setItem("adminState", "true")
      : localStorage.setItem("adminState", "false");
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("roll", res.data.roll);
        localStorage.setItem("picture", res.data.picture);
      setUser({
        roll: "",
      });

      showalert(`Welcome ${res.data.name}`, "success");
      setAdmin(res.data.admin);
      setauthenticated(true);
      history.push('../');
      })
    .catch((e) => {
      showalert((e.response && e.response.data) || "No connection established", "danger");
    })
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div>
      <form onSubmit = {onSubmit} className = "form-container">
        <h1 className = "text-primary">
          {" "}
          <span className = "text-light">Account</span> Register{" "}
        </h1>
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

        <input
          type = "submit"
          value = "Register"
          className = "btn btn-block btn-success"
        />
        <p className='login-instruction text-center' style={{marginTop:"25px"}}>Please enter your roll number correctly. This action cannot be averted. </p>
      </form>
    </div>
  );
};

export default Register;
