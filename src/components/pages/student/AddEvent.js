import React from 'react'
import { Link } from "react-router-dom";

const AddEvent = () => {
    const a=(
        <div  className="add-event">
            <h1 className="large text-primary text-center">17173004: Aman Jain</h1>
            
            <h1 className="text-center" style={{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Add an event:{" "}</h1>
            <div>
            <Link to ="../student/addinternal"><button className="event-btn">Internal <span>Event</span><span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button></Link>
            <Link to ="../student/addexternal"><button className="event-btn">External <span>Event</span><span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button></Link>
            <Link to ="../student/addpor"><button className="event-btn">Position of <span>Responsibility</span><span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button></Link>
            </div>
        </div>
    )
    return a;
}

export default AddEvent;
