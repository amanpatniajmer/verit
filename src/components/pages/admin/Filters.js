import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import committees from '../../common/committees.json'
let timer;
const Filters = ({verifiedFilter, unverifiedFilter,sessionFilter,clubFilter, typeFilter, searchFilter}) => {
    const history=useHistory();
    
    const [verified, setVerified] = useState(verifiedFilter)
    const [unverified, setUnverified] = useState(unverifiedFilter)
    const [session, setSession] = useState(sessionFilter)
    const [club, setClub] = useState(clubFilter)
    const [type, setType] = useState(typeFilter)
    const [search, setSearch] = useState(searchFilter)
    const searchDelayer=()=>{
        clearTimeout(timer)
        timer=setTimeout(() => {
            history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
        }, 500);
    }
    //Send Request to backend for updated data, then update state of all data
    return (
        <div className="filters-container">
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Verified{" "}
                <input type="checkbox" checked={verified} onChange={()=>{
                    history.push({pathname: './list', search: `?verified=${!verified}&unverified=${unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                    setVerified(!verified);
                    }}/></label>
                <label>Unverified{" "}
                <input type="checkbox" checked={unverified} onChange={()=>{
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${!unverified}&club=${club}&session=${session}&type=${type}&search=${search}`});
                    setUnverified(!unverified);
                    }}/></label>
            </div>
            <div className="filter-container" style={{display:"flex", flexDirection:"column"}}>
                <label style={{margin:"0"}}>Session{" "}</label>
                <select required={true} value={session} onChange={(e)=>{
                    setSession(e.target.value)
                    history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${club}&session=${e.target.value}&type=${type}&search=${search}`});
                    }}>
                    <option value="All">All</option>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
                </select>
            </div>
            <div className="filter-container">
              <label>Club/Council</label>
              <select name="club" value={club} onChange={(e)=>{
                const val=e.target.value;
                setClub(val);
                history.push({pathname: './list', search: `?verified=${verified}&unverified=${unverified}&club=${e.target.value}&session=${session}&type=${type}&search=${search}`});
                }} required={true}>
                {committees[localStorage.getItem('name')]["Clubs"].map((item)=><option value={item} key={item}>{item}</option>)}
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
        <div className="filter-container">
        <input type="text" placeholder="Search..." value={search} onChange={(e)=>{
            setSearch(e.target.value);
        }} onKeyUp={searchDelayer}/>
        </div>
        </div>
    )
}

export default Filters
