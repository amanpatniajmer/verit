import React, {useState} from 'react'
import AddInternal from "./AddInternal";
import AddExternal from "./AddExternal";

const AddEvent = () => {
    const [click, setClick] = useState("");
    const a=(
        <div >
            <h1 className="text-center">Add an event of type:</h1>
            <div className="text-center">
                <button className="btn-danger btn" onClick={()=>setClick("Internal")}>Internal Event</button>
                <button className="btn-dark btn" onClick={()=>setClick("External")}>External Event</button>
            </div>
        </div>
    )
    if(click==="Internal") 
        return <AddInternal click={setClick}/>
    else if(click==="External")
        return <AddExternal click={setClick}/>
    else return a;
}

export default AddEvent
