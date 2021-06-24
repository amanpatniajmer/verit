import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../context/Context';
import ListItem from "./ListItem";
import Filters from "./Filters";
import queryString from "query-string";
import Axios from 'axios';
import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
import Pagination from '../../common/Pagination';
import convert from '../../common/ToCSV';
import {sort} from '../../common/Sort';
import {filter} from '../../common/Filter';
import {paginate} from '../../common/Pagination';

const List = ({location, setActive}) => {
    const [, setloading] = useContext(Context);

    let query = queryString.parse(location.search)
        query = JSON.parse(JSON.stringify(query));
    let verifiedFilter = bool(query.hasOwnProperty('verified') ? query.verified : false);
    let unverifiedFilter = bool(query.hasOwnProperty('unverified') ? query.unverified : false);
    let type = query.hasOwnProperty('type') ? query.type : "-1";
    let club = query.hasOwnProperty('club') ? query.club : "-1";
    let session = query.hasOwnProperty('session') ? query.session : "-1";
    let search = query.hasOwnProperty('search') ? query.search : "";

    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [state, setState] = useState({
        curr: 1,
        size: 4,
        total: 0
    });

    const [order, setOrder] = useState({
        field: "Date",
        asc: true, 
        type: "Date"
    });

    const downloadCSV = () => {
        convert(filter(allData, verifiedFilter, unverifiedFilter, session, club, type), localStorage.getItem('name') + '_' + session);
    }

    const clearVisualUpdates = () => {
        let tempx = allData;

        for(let i = 0; i < updates.length; i++){
            let index = allData.findIndex((item) => item._id === updates[i]._id);
            tempx[index] = updates[i];
        }
        setAllData(tempx);
        tempx = filteredData;

        for(let i = 0; i < updates.length; i++){
            let index = filteredData.findIndex((item) => item._id === updates[i]._id);
            tempx[index] = updates[i];
        }
        setFilteredData(filteredData);
        setUpdates([]);
    }

    const [updates, setUpdates] = useState([]);

    const pageChange = (page) => 
    {
        clearVisualUpdates();
        setState({...state, curr: page});
        setData(paginate(filteredData, page, state.size));
    }
    const pageSizeChange = (size) => 
    {
        if(size === undefined || size === "") 
            return;
        clearVisualUpdates();
        setState({ ...state, size, curr: 1});
        setData(paginate(filteredData, 1, size));
    }
    const update = (v, u, s, c, t, se, o) => 
    {
        clearVisualUpdates();
        let temp = filter(allData, v, u, s, c, t, se);
        setState({ ...state, curr: 1, total: temp.length });
        temp = sort(temp, o.asc, o.field, o.type);
        setFilteredData(temp);
        setData(paginate(temp, 1, state.size));
    }

    useEffect(() => {
        let componentMounted=true;
        setloading(true);
        Axios.get(`${process.env.REACT_APP_SERVER}/api/apply/${localStorage.getItem('name')}?token=${localStorage.getItem('token')}`)
        .then((res) => {
            if(componentMounted){
                setAllData(res.data);
            }
            setloading(false);
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => window.location.href = "/");
            }
            setloading(false);
        });
        return ()=>componentMounted=false;
    }, [setloading])
    
    useEffect(() => {
        setActive("List");
        update(verifiedFilter, unverifiedFilter, session, club, type, search, order);
        //eslint-disable-next-line
    }, [allData, verifiedFilter, unverifiedFilter, session, club, type, search, order]);

    return (
        <div style = {{ display: "grid", placeContent: "center", margin: "8vh 0" }}>
            <Filters 
                    sessionFilter = {session} 
                    clubFilter = {club} 
                    verifiedFilter = {verifiedFilter} 
                    unverifiedFilter = {unverifiedFilter} 
                    typeFilter = {type} 
                    searchFilter = {search} />
            <h2 className = "text-center" style = {{ margin: "10px 0px", color: "#f190dd" }}>Verification Requests</h2>
            <div className = "table">
                <table>
                    <TableHeader 
                                columns = {columns} 
                                sort = {order} 
                                setSort = {setOrder} />
                    <TableBody data = {data} 
                            content = {(i) => 
                                                <ListItem 
                                                        data = {i} 
                                                        id = {i._id} 
                                                        key = {i._id} 
                                                        updates = {updates} 
                                                        setUpdates = {setUpdates}/>}/>
                </table>
                </div>
                <Pagination 
                            curr = {state.curr} 
                            total = {state.total} 
                            size = {state.size} 
                            pageChange = {pageChange} 
                            sizeChange = {pageSizeChange} />
            <button className = "btn btn-success" style={{margin:"auto", maxWidth:"100%"}}
                    onClick = {downloadCSV}>Download as CSV</button>
        </div>
    )
}

function bool(val) { return val === true || val === "true" }

const columns = [{name: "Type", type: "String"}, 
                {name: "Roll", type: "Number"}, 
                {name: "Name", type: "String"}, 
                {name: "Club", type: "String"}, 
                {name: "Event", type: "String"}, 
                {name: "SubEvent", type: "String"}, 
                {name: "Position", type: "String"}, 
                {name: "Session", type: "String"}, 
                {name: "Status", type: "String"}, 
                {name: ""}];

export default List;
