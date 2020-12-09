import React from 'react'
import { Link } from "react-router-dom";

const AddEvent = () => {
    const a=(
        <div >
            <h1 className="text-center">Add an event of type:
                <Link to ="./addinternal"><button className="btn-danger btn">Internal Event</button></Link>
                <Link to ="./addexternal"><button className="btn-dark btn">External Event</button></Link>
            </h1>
        </div>
    )
    return a;
}

export default AddEvent
