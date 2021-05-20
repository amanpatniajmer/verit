import React, { useState } from 'react'
import Axios from 'axios';
import queryString from "query-string";

const ForgotPassword = ({ location, showAlert }) => {
    
    let query = queryString.parse(location.search)
    const onChange = (e) => setEmail(e.target.value);

    const [email, setEmail] = useState(query.email);

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === "") {
            showAlert("Please fill in all fields.", "danger");
        }
        else if (!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)) {
            showAlert('Email not correct. Enter institute email address.', "danger");
        }
        else {
            Axios.get(`${process.env.REACT_APP_SERVER}/api/forgotpassword?email=${email}`)
                .then(() => {
                    setEmail("");
                    // console.log(res.data);
                    showAlert(`Password change successful.`, "success");
                })
                .catch(() => { 
                    // console.log('Problem' + e); 
                    showAlert("Error.", "danger");
                })
        }
    };
    return (
        <form onSubmit = {onSubmit} className = "form-container">
            <h1 className = "text-primary">
                {" "}
                <span className = "text-dark">Forgot</span> Password{" "}
            </h1>

            <div className = "form-group">
                <label>Email Address</label>
                <input
                    type = "email"
                    name = "email"
                    value = {email}
                    placeholder = "Enter email"
                    onChange = {onChange}
                    autoComplete = "off"
                    required
                />
            </div>

            <input
                type = "submit"
                value = "Send Reset Link"
                className = "btn btn-block btn-primary"
            />
        </form>
    )
}

export default ForgotPassword;
