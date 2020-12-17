import React, { useEffect, useState } from "react";
import SVG from "../../img/2144242.png";
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const Login = ({setauthenticated,setAdmin}) => {
  useEffect(() => {
    localStorage.clear();
  }, [])
  const [user, setUser] = useState({
    email: "aman.jain.phy17@itbhu.ac.in",
    password: "yobabe"
  });
  
  const history = useHistory();

  const { email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } 
    else if(!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)){
      alert('Email not correct. Enter institute email address.')
    }
    else {
      // console.log("Logged In");
      let formdata=new FormData(e.target);
      let object = {};
      formdata.forEach(function(value, key){
        object[key] = value;
      });
      Axios.post('http://localhost:5000/api/login',object)
      .then((res)=>{
        console.log(res.data)
        localStorage.setItem("token",res.data.token);
        res.data.admin===true ? localStorage.setItem("adminState","true")
        :localStorage.setItem("adminState","false");
        localStorage.setItem("name",res.data.name)
        localStorage.setItem("email",res.data.email)
        localStorage.setItem("roll",res.data.roll)
        setauthenticated(true);
        setAdmin(res.data.admin)
        setUser({
          email: "",
          password: "",
        });
        history.push('/');
      })
      .catch((e)=>{console.log('Problem'+e);})
      /* window.location.href="/"; */
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
