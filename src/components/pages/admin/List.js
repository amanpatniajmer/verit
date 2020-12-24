import React, { useEffect, useState } from 'react';
import ListItem from "./ListItem";
import Filters from "./Filters";
import queryString from "query-string";
import Axios from 'axios';

const List = ({location}) => {
    function bool(val) { return val===true || val === "true" }
    let query=queryString.parse(location.search)
    let verifiedFilter=bool(query.verified);
    let unverifiedFilter=bool(query.unverified);
    let session=query.session;
    let club=query.club;
    const [data1,setData1] = useState(null)
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/apply/${localStorage.getItem('name')}?token=${localStorage.getItem('token')}`)
        .then((res)=>{
            // console.log(res.data); 
            setData1(res.data)})
        .catch((err)=>
        console.error(err)
        );
    }, [])
    
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Type</th>
                    <th className="text-center text-dark">Roll No</th>
                    <th className="text-center text-dark">Name</th>
                    <th className="text-center text-dark">Club</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">SubEvent</th>
                    <th className="text-center text-dark">Position</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Actions</th>
                </tr></thead>
                <tbody>
                    {data1 && data1['internal'] && 
                    data1['internal'].map((i,index) => {
                        let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                        if(statusFilters && sessionFilters && clubFilters)
                        return <ListItem type="Internal" data={i} id={index} setdata={setData1} key={i._id}/>
                        else return null;
                    })}
                    {data1 && data1['external'] && 
                    data1['external'].map((i,index) => {
                        let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                        if(statusFilters && sessionFilters && clubFilters)
                        return <ListItem type="External" data={i} id={index} setdata={setData1} key={i._id}/>
                        else return null;
                    })}
                    {data1 && data1['por'] && 
                    data1['por'].map((i,index) => {
                        let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                        if(statusFilters && sessionFilters && clubFilters)
                        return <ListItem type="POR" data={i} id={index} setdata={setData1} key={i._id}/>
                        else return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List;
