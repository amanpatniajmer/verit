import React, { useEffect } from 'react';
import AddEvent from "./AddEvent";
const Admin = ({showalert, setActive}) => {
    useEffect(() => {
        setActive("Dashboard");
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <AddEvent showAlert = {showalert}/>
        </div>
    )
}

export default Admin;
