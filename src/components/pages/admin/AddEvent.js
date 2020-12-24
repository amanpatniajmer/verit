import React from 'react';
import {Link} from 'react-router-dom';
import cultLogo from "../../../img/small-logo.jpg";

const AddEvent = () => {
    const a = (
        <div className = "add-event">
            <img src = {cultLogo} alt = "" style = {{ height: "120px", width: "120px" }} />
            <h1 className = "large text-primary text-center">{localStorage.getItem("name")}</h1>
            
            <h1 className = "text-center" style = {{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Add an event:{" "}</h1>
            <div>
            <Link to ="../admin/addinternal"><button className = "event-btn">Internal <span>Event</span><span><i className = "fa fa-plus-circle" style = {{ marginTop:"5px" }}/></span></button></Link>
            <Link to = "../admin/addexternal"><button className = "event-btn">External <span>Event</span><span><i className = "fa fa-plus-circle" style = {{ marginTop:"5px" }}/></span></button></Link>
            </div>
            <h1 className = "text-center" style = {{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Event History:{" "}</h1>
            <Link to = "../admin/eventslist?active=false&inactive=false&session=All&internal=false&external=false"><button className = "btn btn-success">Event History{" "}<i className = "fa fa-history" style = {{ marginTop:"5px" }}/></button></Link>
            
        </div>
    )
    return a;
}

export default AddEvent;
