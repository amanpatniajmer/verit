import React, { useContext, useEffect, useState } from 'react';
import EventsListItem from "./EventsListItem";
import EventsFilters from "./EventsFilters";
import queryString from "query-string";
import Axios from 'axios';
import { Context } from '../../../context/Context'
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';

const EventsList = ({location}) => {
    const [,setloading]=useContext(Context);
    let query=queryString.parse(location.search)
    let activeFilter=bool(query.active);
    let inactiveFilter=bool(query.inactive);
    let internalFilter=bool(query.internal);
    let externalFilter=bool(query.external);
    let {session}=query;
    const [data,setData] = useState([]);
    const [allData,setAllData] = useState([]);
    const [state,setState]=useState({
        curr:1,
        size:4,
        total: 0
    })
    /*const downloadCSV=()=>{
        convert(filter(allData,verifiedFilter,unverifiedFilter,session,club ),localStorage.getItem('name')+'_'+session);
    }*/
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
        setData(paginate(allData,page, state.size));
    }
    
    const update=(v,u,s,c,session)=>{
        clearVisualUpdates();
        const temp=filter(allData,v,u,s,c,session );
        setState({...state, curr:1, total:temp.length});
        setData(paginate(temp,1,state.size));
    }

    useEffect(() => {
        setloading(true);
        Axios.get(`${process.env.REACT_APP_SERVER}/api/events?token=${localStorage.getItem('token')}`)
        .then((res)=>{
            setAllData(res.data.reverse());
            setloading(false);
        })
        .catch((err)=>{
            console.error(err);
            setloading(false);
        })
    }, [setloading])
    useEffect(() => {
        update(activeFilter, inactiveFilter, internalFilter,externalFilter, session);
//eslint-disable-next-line
    }, [allData, activeFilter, inactiveFilter, internalFilter, externalFilter, session]);
    
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <EventsFilters sessionFilter={session} internalFilter={internalFilter} externalFilter={externalFilter} activeFilter={activeFilter} inactiveFilter={inactiveFilter}/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Events List</h2>
            <table >
                <TableHeader columns={columns}/>
                <TableBody data={data} content={(i)=><EventsListItem data={i} id={i._id} key={i._id}/>}/>
            </table>
            <Pagination  curr={state.curr} total={state.total} size={state.size} pageChange={pageChange}/>
        </div>
    )
}

const paginate=(items, curr, size)=>{
    const start=(curr-1)*size;
    let temp=items.slice(start);
    while(temp.length>size) temp.pop();
    return temp;
}
const filter = (array, activeFilter,inactiveFilter,internalFilter, externalFilter, session) => {
    return array.filter((item) => (
        (session==="undefined" || session==="All" || session===item.session) &&
        ((activeFilter===inactiveFilter) || (activeFilter && item.status==="Active") || (inactiveFilter && item.status==="Inactive")) &&
        ((internalFilter===externalFilter) || (externalFilter))
    ));
}
function bool(val) { return val === true || val === "true" }

const columns=["Type","Event","Sub-Events","Session","Status","Actions"];

export default EventsList;
