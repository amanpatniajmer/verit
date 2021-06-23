import React from 'react';
import { Link } from "react-router-dom";

const AddEvent = ({showalert}) => 
{
    const a = (
        <div className = "add-event">
            <h1 className = "large text-primary text-center">{localStorage.getItem('roll')} : {localStorage.getItem('name')}</h1>
            
            {localStorage.getItem('email')}
            
            <h1 className = "text-center">Add an event:{" "}</h1>

            <div className = 'diff-events'>
                <Link 
                    to = "../student/addinternal" 
                    showalert = {showalert}>
                    <button className = "event-btn">Internal <span>Event</span><span><i className = "fa fa-plus-circle"/></span></button>
                </Link>
                <Link 
                    to = "../student/addexternal" 
                    showalert = {showalert}>
                    <button className = "event-btn">External <span>Event</span><span><i className = "fa fa-plus-circle"/></span></button>
                </Link>
                <Link 
                    to = "../student/addpor" 
                    showalert = {showalert}>
                    <button className = "event-btn">Position of <span>Responsibility</span><span><i className = "fa fa-plus-circle"/></span></button>
                </Link>
            </div>
        </div>
    )
    return a;
}

export default AddEvent;
