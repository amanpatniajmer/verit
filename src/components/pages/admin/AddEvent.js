import React from 'react';
import {Link} from 'react-router-dom';

const AddEvent = ({showalert}) => {
    const a = (
        <div className = "add-event">
            <img src = {localStorage.getItem("picture")} alt = "Logo"/>
            <h1 className = "large text-primary text-center">{localStorage.getItem("name")}</h1>
            
            <h1 className = "text-center">Add an event:{" "}</h1>
            <div className = "diff-events">
                <Link 
                    to ="../admin/addinternal" 
                    showalert = {showalert}>
                    <button className = "event-btn">Internal <span>Event</span><span><i className = "fa fa-plus-circle"/></span></button>
                </Link>
                <Link 
                    to = "../admin/addexternal" 
                    showalert = {showalert}>
                    <button className = "event-btn">External <span>Event</span><span><i className = "fa fa-plus-circle"/></span></button>
                </Link>
            </div>
        </div>
    )
    return a;
}

export default AddEvent;
