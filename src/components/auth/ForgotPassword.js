import React, { useState } from 'react'
import Axios from 'axios';
import queryString from "query-string";

const ForgotPassword = ({ location }) => {
    let query = queryString.parse(location.search)
    const onChange = (e) => setEmail(e.target.value);
    const [email, setEmail] = useState(query.email);
    const onSubmit = (e) => {
        e.preventDefault();

        if (email === "") {
            alert("Please fill in all fields");
        }
        else if (!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)) {
            alert('Email not correct. Enter institute email address.')
        }
        else {
            Axios.get(`http://localhost:5000/api/forgotpassword?email=${email}`)
                .then((res) => {
                    setEmail("");
                    console.log(res.data);
                })
                .catch((e) => { console.log('Problem' + e); })
        }
    };
    return (
        <form onSubmit={onSubmit} className="form-container">
            <h1 className="text-primary">
                {" "}
                <span className="text-dark">Forgot</span> Password{" "}
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



            <input
                type="submit"
                value="Send Reset Link"
                className="btn btn-block btn-primary"
            />
        </form>
    )
}

export default ForgotPassword
