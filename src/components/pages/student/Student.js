import React from 'react';
import AddEvent from "./AddEvent";

const Student = ({ showalert }) => {
    return (
        <div>
            <AddEvent showAlert = {showalert}/>
        </div>
    )
}

export default Student;
