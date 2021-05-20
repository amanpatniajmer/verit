import React, { useEffect, useState } from 'react';
import ListItem from "./ListItem";
import Filters from "./Filters";
import queryString from "query-string";
import Axios from 'axios';
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';

const List = ({location}) => {
    let query=queryString.parse(location.search)
    let verifiedFilter=bool(query.verified);
    let unverifiedFilter=bool(query.unverified);
    let session=query.session;
    let club=query.club;
    const [allData, setAllData] = useState([]);
    const [data,setData]=useState([]);
    const [state,setState]=useState({
        curr:1,
        size:4,
        total: 0
    })
    const pageChange=(page)=>{
        setState({...state,curr:page});
        setData(paginate(allData,page, state.size));
    }
    const update=(v,u,s,c)=>{
        const temp=filter(allData,v,u,s,c );
        setState({...state, curr:1, total:temp.length});
        setData(paginate(temp,1,state.size));
    }

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER}/api/apply/${localStorage.getItem('name')}?token=${localStorage.getItem('token')}`)
        .then((res)=>{
            setAllData(res.data);
        })
        .catch((err)=>
        console.error(err)
        );
    }, [])
    
    useEffect(() => {
        update(verifiedFilter,unverifiedFilter, session,club);
//eslint-disable-next-line
    }, [allData,verifiedFilter,unverifiedFilter, session,club]);

    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <TableHeader columns={columns}/>
                <TableBody data={data} content={(i)=><ListItem data={i} id={i._id} key={i._id}/>}/>
            </table>
            <Pagination curr={state.curr} total={state.total} size={state.size} pageChange={pageChange}/>
        </div>
    )
}

const paginate=(items, curr, size)=>{
    const start=(curr-1)*size;
    let temp=items.slice(start);
    while(temp.length>size) temp.pop();
    return temp;
}
const filter = (array, verifiedFilter, unverifiedFilter, session, club) => {
    return array.filter((item) => (
        (verifiedFilter === unverifiedFilter) || (verifiedFilter && item.status === "Verified") || (unverifiedFilter && item.status === "Unverified")) &&
        (session === "undefined" || session === "All" || session === item.session) && 
        (club === "undefined" || club === "Cultural Council" || club === item.club)
    );
}
function bool(val) { return val === true || val === "true" }

const columns = ["Type", "Roll No", "Name", "Club", "Event","SubEvent","Position", "Session","Status", "Action"];

export default List;
