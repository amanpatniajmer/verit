import React from 'react'
import { Link } from "react-router-dom";
import cultLogo from "../../../img/small-logo.jpg"

const AddEvent = () => {
    const a=(
        <div  className="add-event">
            <img src={cultLogo} alt="" style={{ height: "120px", width: "120px" }} />
            <h1 className="large text-primary text-center">Cultural Council: General Secretary</h1>
            <h1 className="text-center" style={{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Add an event:{" "}
                <Link to ="../admin/addinternal"><button className="btn-danger btn">Internal Event</button></Link>
                <Link to ="../admin/addexternal"><button className="btn-dark btn">External Event</button></Link>
                </h1>
        </div>
    )
    return a;
}

export default AddEvent;
