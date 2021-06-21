import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

let timer;
const EventsFilters = ({activeFilter, inactiveFilter, sessionFilter, typeFilter, searchFilter}) => {
    const history = useHistory();
    
    const [verified, setVerified] = useState(activeFilter)
    const [unverified, setUnverified] = useState(inactiveFilter)
    const[verificationStatus, setVerificationStatus]= useState("All");
    const [session, setSession] = useState(sessionFilter)
    const [type, setType] = useState(typeFilter)
    const [search, setSearch] = useState(searchFilter)
    const searchDelayer = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${unverified}&session=${session}&type=${type}&search=${search}`});
        }, 500);
    }

    //Send Request to backend for updated data, then update state of all data
    return (
        <div className = "filters-container">
            <div className = "filter-container">
                <label>Search</label>
                <input 
                        type = "text" 
                        value = {search} 
                        onChange = {(e) => {setSearch(e.target.value);}} 
                onKeyUp = {searchDelayer}/>
            </div>
                <div className = "filter-container">
                <label> Status</label>
                <select 
                                required = {true} 
                                value = {verificationStatus} 
                                onChange = {(e) => {
                                    setVerificationStatus(e.target.value);
                                    if(e.target.value==='Active') {
                                        setVerified(true); setUnverified(false);
                                        history.push({pathname: './eventslist', search: `?active=${true}&inactive=${false}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    else if(e.target.value==='Inactive') {
                                        setVerified(false); setUnverified(true);
                                        history.push({pathname: './eventslist', search: `?active=${false}&inactive=${true}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    else {
                                        setVerified(true); setUnverified(true);
                                        history.push({pathname: './eventslist', search: `?active=${true}&inactive=${true}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    }}>
                            <option value = "All">All</option>
                            <option value = "Active">Active</option>
                            <option value = "Inactive">Inactive</option>
                        </select>
                    {/* <label style = {{margin: "0"}}>Active{" "}
                        <input 
                                type = "checkbox" 
                                checked = {verified} 
                                onChange = {() => {
                                                    history.push({pathname: './eventslist', search: `?active=${!verified}&inactive=${unverified}&session=${session}&type=${type}&search=${search}`});
                                                    setVerified(!verified);}}/>
                    </label>
                    <label>Inactive{" "}
                        <input 
                                type = "checkbox" 
                                checked = {unverified} 
                                onChange = {() => {
                                                    history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${!unverified}&session=${session}&type=${type}&search=${search}`});
                                                    setUnverified(!unverified);}}/>
                    </label> */}
                </div>
                
                <div className = "filter-container">
                    <label>Type</label>
                    <select 
                                required = {true} 
                                value = {type} 
                                onChange = {(e) => {
                                                    setType(e.target.value)
                                                    history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${unverified}&session=${session}&type=${e.target.value}&search=${search}`});}}>
                        <option value = "-1">All</option>
                        <option value = "Internal">Internal</option>
                        <option value = "External">External</option>
                    </select>
                </div>

                <div className = "filter-container">
                    <label>Session{" "}</label>
                    <select 
                            required = {true} 
                            value = {session} 
                            onChange = {(e) => {
                                                setSession(e.target.value)
                                                history.push({pathname: './eventslist', search: `?active=${verified}&inactive=${unverified}&session=${e.target.value}&type=${type}&search=${search}`});}}>
                        <option value = "All">All</option>
                        <option value = "2020-21">2020-21</option>
                        <option value = "2019-20">2019-20</option>
                        <option value = "2018-19">2018-19</option>
                    </select>
                </div>
            </div>
    )
}

export default EventsFilters;
