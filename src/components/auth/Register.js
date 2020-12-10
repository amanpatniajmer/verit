import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
  });

  const { name, roll, email, password } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || roll === "" || email === "" || password === "") {
      alert("Please fill in all fields");
    }
    else if(!roll.match(/[0-9]{8}/)){
      alert("Roll not correct")
    }
    else if(!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)){
      alert('Email not correct. Enter institute email address.')
    }
     else {
      setUser({
        name: "",
        roll: "",
        email: "",
        password: "",
      });
    }
  };
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div>
      <form onSubmit={onSubmit} className="form-container">
        <h1 className="text-primary">
          {" "}
          <span className="text-dark">Account</span> Register{" "}
        </h1>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={onChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label>Roll No.</label>
          <input
            type="text"
            name="roll"
            value={roll}
            placeholder="Enter roll no."
            onChange={onChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
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
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
