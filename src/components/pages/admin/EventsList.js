import React, { useState } from 'react'
import EventsListItem from "./EventsListItem";
import EventsFilters from "./EventsFilters";
import queryString from "query-string";
import Axios from 'axios';

const EventsList = ({location}) => {
    function bool(val) { return val===true || val === "true" }
    let query=queryString.parse(location.search)
    let activeFilter=bool(query.active);
    let inactiveFilter=bool(query.inactive);
    let session=query.session;
    const [data1,setData1] = useState([{
        event: "Aagman",
        session: "2019-20",
        status: "Active"
    },{
        event: "Kashiyatra",
        session: "2020-21",
        status: "Inactive"
    },{
        event: "Aagman",
        session: "2020-21",
        status: "Inactive"
    }])
    const fetchList = (organization) =>{
        Axios.get(`https://localhost:5000/internalevents/${organization}/`)
        .then((res)=>console.log(res.data))
    }
    fetchList("Cultural Council")
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <EventsFilters sessionFilter={session} activeFilter={activeFilter} inactiveFilter={inactiveFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Events List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Actions</th>
                </tr></thead>
                <tbody>
                    {data1.map((i,index) => {
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let statusFilters=(activeFilter===inactiveFilter) || (activeFilter && i.status==="Active") || (inactiveFilter && i.status==="Inactive")
                        if(sessionFilters && statusFilters)
                        return <EventsListItem data={i} id={index} setdata={setData1} key={i.event+"_"+i.session}/>
                        else return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EventsList
