import React, { useEffect,useState } from 'react'
import ListItem from "./ListItem";
import Filters from "./Filters";
import Axios from 'axios';
import queryString from "query-string";
const List = ({location}) => {
    function bool(val) { return val===true || val === "true" }
    let query=queryString.parse(location.search)
    let verifiedFilter=bool(query.verified);
    let unverifiedFilter=bool(query.unverified);
    let session=query.session;
    let club=query.club;
    const [data,setData]=useState(null);
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/apply?token=${localStorage.getItem("token")}`)
        .then((res)=>{
            console.log(res.data); 
            setData(res.data);
        })
        .catch((e)=>{console.log('Problem'+e.response);})
    }, [])
    
    
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Type</th>
                    <th className="text-center text-dark">Club</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Applied on</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Action</th>
                </tr></thead>
                <tbody>
                {data && data['internal'] && 
                    data['internal'].map((i,index) => {
                        let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                        let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                        let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                        if(statusFilters && sessionFilters && clubFilters)
                        return <ListItem type="Internal" data={i} key={i._id}/>
                        else return null;
                })}
                {data && data['external'] && 
                data['external'].map((i,index) => {
                    let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                    let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                    let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                    if(statusFilters && sessionFilters && clubFilters)
                    return <ListItem type="External" data={i} key={i._id}/>
                    else return null;
                })}
                {data && data['por'] && 
                data['por'].map((i,index) => {
                    let statusFilters=(verifiedFilter===unverifiedFilter) || (verifiedFilter && i.status==="Verified") || (unverifiedFilter && i.status==="Unverified")
                    let sessionFilters=(session==="undefined" || session==="All" || session===i.session) 
                    let clubFilters=(club==="undefined" || club==="Cultural Council" || club===i.club)
                    if(statusFilters && sessionFilters && clubFilters)
                    return <ListItem type="POR" data={i} key={i._id}/>
                    else return null;
                })}
                    {/* {data && data['internal'] && data['internal'].map((i)=><ListItem data={i} type="Internal" key={i._id}/>)}
                    {data && data['external'] && data['external'].map((i)=><ListItem data={i} type="External" key={i._id}/>)} */}
                </tbody>
            </table>
        </div>
    )
}

export default List
