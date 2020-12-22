import React, { useState } from 'react'
import Axios from 'axios';
import queryString from "query-string";

const EnterPassword = ({ location }) => {
    let token = queryString.parse(location.search).token;
    const [password,setPassword] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();

        if (password === "") {
            alert("Fields can`t be empty.");
        }
        else {
            let object={};
            object['password']=password;
            Axios.post(`http://localhost:5000/api/forgotpassword/${token}`,object)
            .then((res) => {
                setPassword("");
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
                <label>Enter new Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter new password"
                    onChange={(e)=>setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
            </div>



            <input
                type="submit"
                value="Set Password"
                className="btn btn-block btn-primary"
            />
        </form>
    )
}

export default EnterPassword
