import React, { useEffect, useState, useContext } from 'react';
/* import { useHistory } from "react-router-dom"; */
import { Context } from '../../../context/Context'
import ListItem from "./ListItem";
import Filters from "./Filters";
import queryString from "query-string";
import Axios from 'axios';
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';
import convert from '../../common/ToCSV';

const List = ({location}) => {
    const [,setloading]=useContext(Context);
    let query=queryString.parse(location.search)
    query=JSON.parse(JSON.stringify(query));
    let verifiedFilter=bool(query.hasOwnProperty('verified')?query.verified:false);
    let unverifiedFilter=bool(query.hasOwnProperty('unverified')?query.unverified:false);
    let type=query.hasOwnProperty('type')?query.type:"-1";
    let club=query.hasOwnProperty('club')?query.club:"-1";
    let session=query.hasOwnProperty('session')?query.session:"-1";
    /* let page=query.page; */
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData]=useState([]);
    const [data,setData]=useState([]);
    const [state,setState]=useState({
        curr:1,
        size:4,
        total: 0
    })
    const downloadCSV=()=>{
        convert(filter(allData,verifiedFilter,unverifiedFilter,session,club,type),localStorage.getItem('name')+'_'+session);
    }
    const clearVisualUpdates=()=>{
        let tempx=allData;
        for(let i=0;i<updates.length;i++){
            let index=allData.findIndex((item)=>item._id===updates[i]._id);
            tempx[index]=updates[i];
        }
        setUpdates([]);
        setAllData(tempx);
    }
    const [updates,setUpdates]=useState([]);
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
        Axios.get(`${process.env.REACT_APP_SERVER}/api/apply/${localStorage.getItem('name')}?token=${localStorage.getItem('token')}`)
        .then((res)=>{
            setAllData(res.data);
            console.log(res.data);
            setloading(false);
        })
        .catch((err)=>{
            console.error(err);
            setloading(false);
        }
        );
    }, [setloading])
    
    useEffect(() => {
        update(verifiedFilter,unverifiedFilter, session,club, type);
//eslint-disable-next-line
    }, [allData,verifiedFilter,unverifiedFilter, session,club, type]);

    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters sessionFilter={session} clubFilter={club} verifiedFilter={verifiedFilter} unverifiedFilter={unverifiedFilter} type={type}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <TableHeader columns={columns}/>
                <TableBody data={data} content={(i)=><ListItem data={i} id={i._id} key={i._id} updates={updates} setUpdates={setUpdates}/>}/>
            </table>
            <Pagination curr={state.curr} total={state.total} size={state.size} pageChange={pageChange}/>
            <button className="btn btn-success" onClick={downloadCSV}>Download as CSV</button>
        </div>
    )
}

const paginate=(items, curr, size, total)=>{
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

const columns = ["Type", "Roll No", "Name", "Club", "Event","SubEvent","Position", "Session","Status", "Action"];

export default List;
