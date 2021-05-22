import React, { useEffect, useState, useContext } from 'react'
import Filters from "./Filters";
import Axios from 'axios';
import queryString from "query-string";
import { Context } from '../../../context/Context'
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';
import convert from '../../common/ToCSV';
import ListItem from './ListItem';

const List = ({ location }) => {
    const [, setloading] = useContext(Context);
    let query = queryString.parse(location.search)
    query=JSON.parse(JSON.stringify(query));
    let verifiedFilter=bool(query.hasOwnProperty('verified')?query.verified:false);
    let unverifiedFilter=bool(query.hasOwnProperty('unverified')?query.unverified:false);
    let type=query.hasOwnProperty('type')?query.type:"-1";
    let club=query.hasOwnProperty('club')?query.club:"-1";
    let session=query.hasOwnProperty('session')?query.session:"-1";
    const [allData, setAllData] = useState([]);
    const [data,setData]=useState([]);
    const [filteredData, setFilteredData]=useState([]);
    const [state,setState]=useState({
        curr:1,
        size:4,
        total: 0
    })
    const [updates,setUpdates]=useState([]);
    const downloadCSV=()=>{
        convert(filter(allData,verifiedFilter,unverifiedFilter,session,club, type ),localStorage.getItem('name')+'_'+session);
    }
    const clearVisualUpdates=()=>{
        let tempx=allData;
        for(let i=0;i<updates.length;i++){
            let index=allData.findIndex((item)=>item._id===updates[i]._id);
            tempx.splice(index,1);
        }
        setUpdates([]);
        setAllData(tempx);
    }
    const pageChange=(page)=>{
        clearVisualUpdates();
        setState({...state,curr:page});
        setData(paginate(filteredData,page, state.size));
    }
    const update=(v,u,s,c,t)=>{
        clearVisualUpdates();
        const temp=filter(allData,v,u,s,c,t);
        setState({...state, curr:1, total:temp.length});
        setFilteredData(temp);
        setData(paginate(temp,1,state.size));
    }
    useEffect(() => {
        setloading(true);
        Axios.get(`${process.env.REACT_APP_SERVER}/api/apply?token=${localStorage.getItem("token")}`)
            .then((res) => {
                setAllData(res.data.reverse());
                setloading(false);
            })
            .catch((e) => { console.log('Problem ' + e.response); })
    }, [setloading]);

    useEffect(() => {
        update(verifiedFilter,unverifiedFilter, session,club, type);
//eslint-disable-next-line
    }, [allData,verifiedFilter,unverifiedFilter, session,club, type]);

    return (
        <div style={{ display: "grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter} typeFilter={type}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <TableHeader columns={columns} />
                <TableBody data={data} setAllData={setAllData} content={(i)=><ListItem data={i} key={i._id} updates={updates} setUpdates={setUpdates}/>}/>
            </table>
            <Pagination curr={state.curr} size={state.size} pageChange={pageChange} total={state.total}/>
            <button className="btn btn-success" onClick={downloadCSV}>Download as CSV</button>
        </div>
    )
}

const paginate=(items, curr, size)=>{
    const start=(curr-1)*size;
    let temp=items.slice(start);
    while(temp.length>size) temp.pop();
    return temp;
}
const filter = (array, verifiedFilter, unverifiedFilter, session, club, type) => {
    return array.filter((item) => (
        (verifiedFilter === unverifiedFilter) || (verifiedFilter && item.status === "Verified") || (unverifiedFilter && item.status === "Unverified")) &&
        (session==="-1" || session === "undefined" || session === "All" || session === item.session) && 
        (club==="-1" || club === "undefined" || club === "Cultural Council" || club === item.club) &&
        (type==="-1" || type==="undefined" || type===item.type)
    );
}
function bool(val) { return val === true || val === "true" }
const columns = ["Type", "Club", "Event_Position", "Session", "Applied on", "Status", "Action"];

export default List
