import React, {useEffect} from 'react'

const GoogleSignIn = ({setAuthenticated}) => {
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
        setAuthenticated(true)
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    function onFailure(error) {
        setAuthenticated(false)
        console.log(error);
    }

    return (
        <div id="my-signin2"></div>
    )
}

export default GoogleSignIn
