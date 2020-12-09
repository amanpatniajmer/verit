import React, { useState } from 'react'
import ListItem from "./ListItem";
import Filters from "./Filters";
import queryString from "query-string";

const List = ({location}) => {
    function bool(val) { return val===true || val === "true" }
    let query=queryString.parse(location.search)
    let verifiedFilter=bool(query.verified);
    let unverifiedFilter=bool(query.unverified);
    let session=query.session;
    let club=query.club;
    const [data1,setData1] = useState([{
        roll: 17173004,
        name: "Aman Jain",
        club: "Indian Music Club",
        event: "Aagman",
        session: "2019-20",
        status: "Verified"
    },{
        roll: 17035047,
        name: "Shreyash Baijal",
        club: "Dance Club",
        event: "Aagman",
        session: "2020-21",
        status: "Unverified"
    },{
        roll: 17045104,
        name: "Shreyas Gupta",
        club: "Western Music Club",
        event: "Aagman",
        session: "2020-21",
        status: "Unverified"
    }])
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Roll No</th>
                    <th className="text-center text-dark">Name</th>
                    <th className="text-center text-dark">Club</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Actions</th>
                </tr></thead>
                <tbody>
                    {data1.map((i,index) => {
                        let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                        if(statusFilters && sessionFilters && clubFilters)
                        return <ListItem data={i} id={index} setdata={setData1} key={i.roll+"_"+i.event}/>
                        else return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List
