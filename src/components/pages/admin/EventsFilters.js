import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

let timer;
const EventsFilters = ({activeFilter, inactiveFilter, sessionFilter, typeFilter, searchFilter}) => {
    const history = useHistory();
    
    const [verified, setVerified] = useState(activeFilter)
    const [unverified, setUnverified] = useState(inactiveFilter)
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
            <div style = {{display: "flex", justifyContent: "center"}}>
                <div className = "filter-container" style = {{display: "flex", flexDirection: "column"}}>
                    <label style = {{margin: "0"}}>Active{" "}
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
                    </label>
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

                <div className = "filter-container" style = {{display:"flex", flexDirection:"column"}}>
                    <label style = {{margin:"0"}}>Session{" "}</label>
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

                <div className = "filter-container">
                    <input 
                            type = "text" 
                            placeholder = "Search..." 
                            value = {search} 
                            onChange = {(e) => {
                                                setSearch(e.target.value);}} 
                            onKeyUp = {searchDelayer}/>
                </div>
            </div>
        </div>
    )
}

export default EventsFilters;
