import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

let timer;
const Filters = ({verifiedFilter, unverifiedFilter, sessionFilter, clubFilter, typeFilter, searchFilter}) => 
{
    const history = useHistory();
    
    const [verified, setVerified] = useState(verifiedFilter)
    const [unverified, setUnverified] = useState(unverifiedFilter)
    const[verificationStatus, setVerificationStatus]= useState("All")
    const [session, setSession] = useState(sessionFilter)
    const [club, setClub] = useState(clubFilter)
    const [type, setType] = useState(typeFilter)
    const [search, setSearch] = useState(searchFilter)
    const searchDelayer = () => 
    {
        clearTimeout(timer)
        timer = setTimeout(() => 
                                {
                                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                }, 500);
    }

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
                <label> Verification Status</label>
                <select 
                                required = {true} 
                                value = {verificationStatus} 
                                onChange = {(e) => {
                                    setVerificationStatus(e.target.value);
                                    if(e.target.value==='Verified') {
                                        setVerified(true); setUnverified(false);
                                        history.push({pathname: './list', search: `?verified=${true}&unverified=${false}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    else if(e.target.value==='Unverified') {
                                        setVerified(false); setUnverified(true);
                                        history.push({pathname: './list', search: `?verified=${false}&unverified=${true}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    else {
                                        setVerified(true); setUnverified(true);
                                        history.push({pathname: './list', search: `?verified=${true}&unverified=${true}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                    }
                                    }}>
                            <option value = "All">All</option>
                            <option value = "Verified">Verified</option>
                            <option value = "Unverified">Unverified</option>
                        </select>
                    {/* <label style = {{margin: "0"}}>Verified{" "}
                        <input 
                                type = "checkbox" 
                                checked = {verified} 
                                onChange = {() => {
                                                    history.push({pathname: './list', search: `?verified=${!verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                                    setVerified(!verified);
                                                    }}/>
                    </label>
                    <label>Unverified{" "}
                        <input 
                                type = "checkbox" 
                                checked = {unverified} 
                                onChange = {() => {
                                                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${!unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                                                    setUnverified(!unverified);
                                                    }}/>
                    </label> */}
                </div>

                <div className = "filter-container">
                    <label style = {{margin: "0"}}>Session{" "}</label>
                    <select 
                            required = {true} 
                            value = {session} 
                            onChange = {(e) => {
                                                setSession(e.target.value)
                                                history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${e.target.value}&type=${type}&search=${search}`});
                                                }}>
                        <option value = "All">All</option>
                        <option value = "2020-21">2020-21</option>
                        <option value = "2019-20">2019-20</option>
                        <option value = "2018-19">2018-19</option>
                    </select>
                </div>

                <div className = "filter-container">
                    <label>Club/Council</label>
                    <select 
                            required = {true} 
                            value = {club} 
                            onChange = {(e) => {
                                                setClub(e.target.value)
                                                history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${e.target.value}&session=${session}&type=${type}&search=${search}`});
                                                }}>
                        <option value = "Cultural Council">Cultural Council</option>
                        <option value = "Indian Music Club">Indian Music Club</option>
                        <option value = "Western Music Club">Western Music Club</option>
                        <option value = "Fine Arts Club">Fine Arts Club</option>
                        <option value = "Theatre Club">Theatre Club</option>
                        <option value = "Dance Club">Dance Club</option>
                        <option value = "The Literary Club">The Literary Club</option>
                        <option value = "Quiz Club">Quiz Club</option>
                    </select>
                </div>

                <div className = "filter-container">
                    <label>Type</label>
                    <select 
                            required = {true} 
                            value = {type} 
                            onChange = {(e) => {
                                                setType(e.target.value)
                                                history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${session}&type=${e.target.value}&search=${search}`});
                                                }}>
                        <option value = "-1">All</option>
                        <option value = "Internal">Internal</option>
                        <option value = "External">External</option>
                        <option value = "POR">POR</option>
                    </select>
                </div>
            </div>
    )
}

export default Filters;
