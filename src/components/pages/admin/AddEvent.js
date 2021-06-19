import React from 'react';
import {Link} from 'react-router-dom';
import cultLogo from "../../../img/small-logo.jpg";

const AddEvent = ({showalert}) => {
    const a = (
        <div className = "add-event" style = {{ margin: '10vh 0' }}>
            <img src = {cultLogo} alt = "" style = {{ height: "120px", width: "120px", borderRadius: '50%', marginBottom: '5vh' }} />
            <h1 className = "large text-primary text-center" style = {{marginBottom: "0"}}>{localStorage.getItem("name")}</h1>
            
            <h1 className = "text-center" style = {{ fontFamily: "Arial, Helvetica, sans-serif", margin: "5vh 0 20px 0"}}>Add an event:{" "}</h1>
            <div>
                <Link 
                    to ="../admin/addinternal" 
                    showalert = {showalert}>
                        <button className = "event-btn">Internal <span>Event</span><span><i className = "fa fa-plus-circle" style = {{ marginTop:"5px" }}/></span></button>
                </Link>
                <Link 
                    to = "../admin/addexternal" 
                    showalert = {showalert}>
                        <button className = "event-btn">External <span>Event</span><span><i className = "fa fa-plus-circle" style = {{ marginTop:"5px" }}/></span></button>
                </Link>
            </div>
            <h1 className = "text-center" style = {{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Event History:{" "}</h1>
            <Link 
                to = "../admin/eventslist" 
                showalert = {showalert}>
                    <button className = "btn btn-success">Event History{" "}<i className = "fa fa-history" style = {{ marginTop:"5px" }}/></button>
            </Link>
            
        </div>
    )
    return a;
}

export default AddEvent;
