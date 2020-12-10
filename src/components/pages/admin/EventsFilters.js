import React, { useState} from 'react'
import { useHistory } from "react-router-dom";

const EventsFilters = ({activeFilter, inactiveFilter,sessionFilter}) => {
    const history=useHistory();
    
    const [verified, setVerified] = useState(activeFilter)
    const [unverified, setUnverified] = useState(inactiveFilter)
    const [session, setSession] = useState(sessionFilter)
    //Send Request to backend for updated data, then update state of all data
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Active{" "}
                <input type="checkbox" checked={verified} onChange={()=>{
                    history.push({pathname: './eventslist', search: `?active=${!verified}&inactive=${unverified}&session=${session}`});
                    setVerified(!verified);
                    }}/></label>
                <label>Inactive{" "}
                <input type="checkbox" checked={unverified} onChange={()=>{
                    history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${!unverified}&session=${session}`});
                    setUnverified(!unverified);
                    }}/></label>
            </div>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Session{" "}</label>
                <select required={true} value={session} onChange={(e)=>{
                    setSession(e.target.value)
                    history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${unverified}&session=${e.target.value}`});
                    }}>
                    <option value="All">All</option>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
                </select>
            </div>
        </div>
    )
}

export default EventsFilters
