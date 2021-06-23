import React, { useContext, useEffect, useState } from 'react';
import EventsListItem from "./EventsListItem";
import EventsFilters from "./EventsFilters";
import queryString from "query-string";
import Axios from 'axios';
import { Context } from '../../../context/Context';
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';
import {searchData} from '../../common/Search';
import {sort} from '../../common/Sort';
import {paginate} from '../../common/Pagination';

const EventsList = ({location}) => {
    const [, setloading] = useContext(Context);
    let query = queryString.parse(location.search)
        query = JSON.parse(JSON.stringify(query));
    let activeFilter = bool(query.hasOwnProperty('active') ? query.active : false);
    let inactiveFilter = bool(query.hasOwnProperty('inactive') ? query.inactive : false);
    let session = query.hasOwnProperty('session') ? query.session : "All";
    let type = query.hasOwnProperty('type') ? query.type : "-1";
    let search = query.hasOwnProperty('search') ? query.search : "";
    
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [state, setState] = useState(
    {
        curr: 1,
        size: 4,
        total: 0
    });

    const [order, setOrder] = useState(
    {
        field: "Status",
        asc: true, 
        type: "String"
    });

    const clearVisualUpdates = () => 
    {
        let tempx = allData;
        for(let i = 0; i < updates.length; i++){
            let index = allData.findIndex((item) => item._id === updates[i]._id);
            if(updates[i]['status']==="Deleted") tempx.splice(index,1);
            else tempx[index] = updates[i];
        }
        setAllData(tempx);
        tempx = filteredData;

        for(let i = 0; i < updates.length; i++){
            let index = tempx.findIndex((item) => item._id === updates[i]._id);
            if(updates[i]['status']==="Deleted") tempx.splice(index,1);
            else tempx[index] = updates[i];
        }
        setFilteredData(tempx);
        setUpdates([]);
    }

    const [updates, setUpdates] = useState([]);
    
    const pageChange = (page) =>
    {
        clearVisualUpdates();
        setState({...state, curr: page, total: filteredData.length});
        setData(paginate(filteredData, page, state.size));
    }
    
    const pageSizeChange = (size) => 
    {
        if(size === undefined || size === "") 
            return;
        clearVisualUpdates();
        setState({...state, size, curr: 1});
        setData(paginate(filteredData, 1, size));
    }
    
    const update = (v, u, session, t, search, o) => 
    {
        clearVisualUpdates();
        let temp = filter(allData, v, u, session, t, search);
        setState({...state, curr: 1, total: temp.length});
        temp = sort(temp, o.asc, o.field, o.type);
        setFilteredData(temp);
        setData(paginate(temp, 1, state.size));
    }

    useEffect(() => {
        let componentMounted=true;
        setloading(true);
        Axios.get(`${process.env.REACT_APP_SERVER}/api/events?token=${localStorage.getItem('token')}`)
        .then((res) => {
            if(componentMounted){
                setAllData(res.data.reverse());
            }
            setloading(false);
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => window.location.href = "/");
            }
            console.error(err);
            setloading(false);
        })
        return ()=>componentMounted=false;
    }, [setloading])

    useEffect(() => {
                    update(activeFilter, inactiveFilter, session, type, search, order);
                    //eslint-disable-next-line
    }, [allData, activeFilter, inactiveFilter, type, session, search, order]);
    
    return (
        <div style = {{ display: "grid", placeContent: "center", margin: "8vh 0" }}>
            <EventsFilters 
                            sessionFilter = {session} 
                            activeFilter = {activeFilter} 
                            inactiveFilter = {inactiveFilter} 
                            typeFilter = {type} 
                            searchFilter = {search}/>
            <h2 className = "text-center" style = {{ margin: "10px 0px", color: "#f190dd" }}>Events List</h2>
            <div className='table'>
            <table>
                <TableHeader 
                            columns = {columns}  
                            sort = {order} 
                            setSort = {setOrder} />
                <TableBody 
                            data = {data} 
                            setAllData = {setAllData}
                            content = {(i) => <EventsListItem 
                                                                data = {i} 
                                                                id = {i._id} 
                                                                key = {i._id}
                                                                updates={updates}
                                                                setUpdates={setUpdates}
                                                                />} />
            </table>
            </div>
            <Pagination  
                        curr = {state.curr} 
                        total = {state.total} 
                        size = {state.size} 
                        pageChange = {pageChange} 
                        sizeChange = {pageSizeChange}/>
        </div>
    )
}

const filter = (array, activeFilter, inactiveFilter, session, type, search) => 
{
    return array.filter((item) => (
        ((activeFilter === inactiveFilter) || (activeFilter && item.status === "Active") || (inactiveFilter && item.status === "Inactive")) 
        &&
        (session === "undefined" || session === "All" || session === item.session) 
        && 
        (type === "-1" || type === "undefined" || type === item.type) 
        &&
        (search === undefined || search === "" || searchData(search, item))
    ));
}

function bool(val) { return val === true || val === "true" }

const columns = [{name: "Type", type: "String"}, 
                 {name: "Event", type: "String"}, 
                 {name: "SubEvents", type: "String"}, 
                 {name: "Session", type: "String"}, 
                 {name: "Status", type: "String"}, 
                 {name: ""}];

export default EventsList;
