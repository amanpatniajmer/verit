import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { Redirect } from "react-router-dom";
/* import Register from './Register'; */

const GoogleSignIn = ({setAuthenticated,showalert,setAdmin}) => {
    const [register,showRegister]=useState(false);
    useEffect(() => {
        window.gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
        //eslint-disable-next-line
    }, [])
    function onSuccess(googleUser) {
        var profile = googleUser.getBasicProfile();
        let email=profile.getEmail();
        if (email === "" ) {
            showalert("Please fill in all fields", "danger");
        }
        /* else if(!email.match(/[a-z0-9.]@i{1,2}tbhu\.ac\.in/)){
            showAlert('Email not correct. Enter institute email address.', "danger");
        } */
        else {
            let object = {};
            object['email']=email;
            object['idtoken']=googleUser.getAuthResponse().id_token;
            localStorage.setItem("idtoken",object['idtoken']);
            localStorage.setItem("name",profile.getName());
            localStorage.setItem("email",email);
            Axios.post('http://localhost:5000/api/login', object)
            .then((res) => {
                if(res.data==="Register"){
                    showRegister(true);
                }
                else{
                    localStorage.setItem("token",res.data.token);
                    res.data.admin===true ? localStorage.setItem("adminState","true")
                    :localStorage.setItem("adminState","false");
                    localStorage.setItem("name",res.data.name);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("roll",res.data.roll);
                    localStorage.setItem("picture",res.data.picture);
                    showalert(`Welcome ${res.data.name}`, "success");
                    setAdmin(res.data.admin);
                    setAuthenticated(true);
                }
            })
            .catch((e) => {
                showalert((e.response && e.response.data) || "No connection established", "danger");
                setAuthenticated(false);
            })
        }
    }
    function onFailure(error) {
        setAuthenticated(false)
        console.log(error);
    }

    return (
        <div>
        <div id="my-signin2"></div>
        {register && <Redirect to='/sign-up'/>}
        </div>
    )
}

export default GoogleSignIn
