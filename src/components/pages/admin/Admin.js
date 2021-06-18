import React from 'react';
import AddEvent from "./AddEvent";
const Admin = ({showalert}) => {
    return (
        <div>
            <AddEvent showAlert = {showalert}/>
        </div>
    )
}

export default Admin;
