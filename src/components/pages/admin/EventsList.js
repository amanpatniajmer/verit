import React, { useEffect, useState } from 'react';
import EventsListItem from "./EventsListItem";
import EventsFilters from "./EventsFilters";
import queryString from "query-string";
import Axios from 'axios';

const EventsList = ({location}) => {
    function bool(val) { return val===true || val === "true" }
    let query=queryString.parse(location.search)
    let activeFilter=bool(query.active);
    let inactiveFilter=bool(query.inactive);
    let internalFilter=bool(query.internal);
    let externalFilter=bool(query.external);
    let session=query.session;
    const [data1,setData1] = useState(null);
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER}/api/events?token=${localStorage.getItem('token')}`)
        .then((res)=>{
            setData1(res.data.reverse());
        })
    }, [])
    
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <EventsFilters sessionFilter={session} internalFilter={internalFilter} externalFilter={externalFilter} activeFilter={activeFilter} inactiveFilter={inactiveFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Events List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Type</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Sub-Events</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Actions</th>
                </tr></thead>
                <tbody>
                    {data1 && data1['internal'] && data1['internal'].map((i,index) => {
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let statusFilters=(activeFilter===inactiveFilter) || (activeFilter && i.status==="Active") || (inactiveFilter && i.status==="Inactive")
                        let internalFilters=(internalFilter===externalFilter) || (internalFilter)
                        if(sessionFilters && statusFilters && internalFilters)
                        return <EventsListItem data={i} id={index} type="Internal" setdata={setData1} key={i._id}/>
                        else return null;
                    })}
                    {data1 && data1['external'] && data1['external'].map((i,index) => {
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let statusFilters=(activeFilter===inactiveFilter) || (activeFilter && i.status==="Active") || (inactiveFilter && i.status==="Inactive")
                        let externalFilters=(internalFilter===externalFilter) || (externalFilter)
                        if(sessionFilters && statusFilters && externalFilters)
                        return <EventsListItem data={i} id={index} type="External" setdata={setData1} key={i._id}/>
                        else return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EventsList;
