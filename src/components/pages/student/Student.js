import React, { useEffect } from 'react';
import AddEvent from "./AddEvent";

const Student = ({ showalert, setActive }) => {
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

export default Student;
