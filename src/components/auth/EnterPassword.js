import React, { useState } from 'react'
import Axios from 'axios';
import queryString from "query-string";

const EnterPassword = ({ location, showAlert }) => {
    
    let token = queryString.parse(location.search).token;
    const [password, setPassword] = useState("");

    function togglePass() {
        var a = document.getElementById('password');
        if (a.type === "password") {
            a.type = "text";
        }
        else {
            a.type = "password";
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === "") {
            showAlert("Fields can`t be empty.", "danger");
        }

        else {
            let object = {};
            object['password'] = password;

            Axios.post(`${process.env.REACT_APP_SERVER}/api/forgotpassword/${token}`, object)
            .then(() => {
                setPassword("");
                showAlert("Password reset successful.", "success");
            })
            .catch(() => { 
                showAlert("Error.", "danger")
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
                <label>Enter new Password</label>
                <input id = "password"
                    type = "password"
                    name = "password"
                    value = {password}
                    placeholder = "Enter new password"
                    onChange = {(e) => setPassword(e.target.value)}
                    autoComplete = "off"
                    required
                />
            </div>
            <label>Show Password{"  "}</label>
            <input type = "checkbox" style = {{ width:"auto" }} onClick={() => togglePass()}/>



            <input
                type = "submit"
                value = "Set Password"
                className = "btn btn-block btn-primary"
            />
        </form>
    )
}

export default EnterPassword;
