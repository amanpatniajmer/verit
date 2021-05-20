import React, { useState } from 'react'
import Axios from 'axios';

const ResetPassword = ({ location, showAlert }) => {
    const onChange = (e) => setPassword(e.target.value);

    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

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

        if (password === "" || newpassword === "") {
            showAlert("Please fill in all fields.", "danger");
        }
        else {
            Axios.post(`${process.env.REACT_APP_SERVER}/api/resetpassword/${localStorage.getItem('token')}`, {oldpassword:password, newpassword:newpassword},{
                headers:{
                  'x-auth-token': localStorage.getItem('token')
                }
            })
                .then(() => {
                    setPassword("");
                    setNewPassword("");
                    // console.log(res.data);
                    showAlert("Password reset successful.", "success");
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
                <span className = "text-dark">Reset</span> Password{" "}
            </h1>

            <div className = "form-group">
                <label>Enter old password</label>
                <input
                    type = "password"
                    name = "oldpassword"
                    value = {password}
                    placeholder = "Enter old password"
                    onChange = {onChange}
                    autoComplete = "off"
                    required
                />
            </div>

            <div className = "form-group">
                <label>Enter new password</label>
                <input id = "password"
                    type = "password"
                    name = "newpassword"
                    value = {newpassword}
                    placeholder = "Enter old password"
                    onChange = {(e) => { setNewPassword(e.target.value) }}
                    autoComplete = "off"
                    required
                />
            </div>
            <label>Show Password{"  "}</label>
            <input type = "checkbox" style = {{ width:"auto" }} onClick={() => togglePass()}/>

            <input
                type = "submit"
                value = "Reset Password"
                className = "btn btn-block btn-primary"
            />
        </form>
    )
}

export default ResetPassword;
