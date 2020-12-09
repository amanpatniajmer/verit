import React, {useState} from 'react';
import AddInternal from "./AddInternal";
import AddExternal from "./AddExternal";
import cultLogo from "../../../img/small-logo.jpg"

const AddEvent = () => {
    const [click, setClick] = useState("");
    const a = (
        <div className="add-event">
            <img src={cultLogo} alt="" style={{ height: "120px", width: "120px" }} />
            <h1 className="large text-primary text-center">Cultural Council: General Secretary</h1>
            
            <h1 className="text-center" style={{ fontFamily: "Arial, Helvetica, sans-serif", margin: "20px 0px"}}>Add an event:{" "}</h1>
            <div>
            <Link to ="../admin/addinternal"><button className="event-btn">Internal <span>Event</span><span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button></Link>
            <Link to ="../admin/addexternal"><button className="event-btn">External <span>Event</span><span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button></Link>
            </div>
        </div>
    )
    if(click === "Internal")
        return <AddInternal click={setClick}/>
    else if(click === "External")
        return <AddExternal click={setClick}/>
    else return a;
}

export default AddEvent;
