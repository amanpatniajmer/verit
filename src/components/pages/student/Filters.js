import React, { useState} from 'react'
import { useHistory } from "react-router-dom";

const Filters = ({verifiedFilter, unverifiedFilter,sessionFilter,clubFilter,typeFilter, searchFilter}) => {
    const history=useHistory();
    
    const [verified, setVerified] = useState(verifiedFilter)
    const [unverified, setUnverified] = useState(unverifiedFilter)
    const [session, setSession] = useState(sessionFilter)
    const [club, setClub] = useState(clubFilter)
    const [type, setType] = useState(typeFilter)
    const [search, setSearch] = useState(searchFilter)
    return (
        <div>
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Verified{" "}
                <input type="checkbox" checked={verified} onChange={()=>{
                    history.push({pathname: './list', search: `?verified=${!verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                    setVerified(!verified);
                    /* filter(!verified, unverified, session,club); */
                    }}/></label>
                <label>Unverified{" "}
                <input type="checkbox" checked={unverified} onChange={()=>{
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${!unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                    setUnverified(!unverified);
                    /* filter(verified, !unverified, session,club); */
                    }}/></label>
            </div>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Session{" "}</label>
                <select required={true} value={session} onChange={(e)=>{
                    setSession(e.target.value)
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${e.target.value}&type=${type}&search=${search}`});
                    /* filter(verified, unverified, e.target.value,club); */
                    }}>
                    <option value="All">All</option>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
                </select>
            </div>
            <div className="filter-container">
              <label>Club/Council</label>
              <select required={true} value={club} onChange={(e)=>{
                    setClub(e.target.value)
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${e.target.value}&session=${session}&type=${type}&search=${search}`});
                    }}>
                <option value="Cultural Council">Cultural Council</option>
                <option value="Indian Music Club">Indian Music Club</option>
                <option value="Western Music Club">Western Music Club</option>
                <option value="Fine Arts Club">Fine Arts Club</option>
                <option value="Theatre Club">Theatre Club</option>
                <option value="Dance Club">Dance Club</option>
                <option value="The Literary Club">The Literary Club</option>
                <option value="Quiz Club">Quiz Club</option>
              </select>
            </div>
            <div className="filter-container">
              <label>Type</label>
              <select required={true} value={type} onChange={(e)=>{
                    setType(e.target.value)
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${session}&type=${e.target.value}&search=${search}`});
                    }}>
                <option value="-1">All</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="POR">POR</option>
              </select>
            </div>
        </div>
        <input type="text" placeholder="Search..." value={search} onChange={(e)=>{
            setSearch(e.target.value);
            history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${e.target.value}`});
        }}/>
        </div>
    )
}

export default Filters
