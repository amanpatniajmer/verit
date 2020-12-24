import React, { useState } from 'react';
import Axios from 'axios';

const EventsListItem = ({data,id,setdata, type}) => {
    const {event,subevents,session, status,_id} = data;
    const [loading, setLoading] = useState(false)
    const [newStatus, setNewStatus] = useState(status);
    const internalActivate = () =>{
        setLoading(true);
        Axios.put(`http://localhost:5000/api/internalevents/activate?token=${localStorage.getItem('token')}`,{
            id:_id
        }).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Active");
            setLoading(false);
        })
        .catch(err=>{
            // console.log(err)
            setLoading(false);
        })
    }
    const externalActivate = () =>{
        setLoading(true);
        Axios.put(`http://localhost:5000/api/externalevents/activate?token=${localStorage.getItem('token')}`,{
            id:_id
        }).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Active");
            setLoading(false);
        })
        .catch(err=>{
            // console.log(err)
            setLoading(false);
        })
    }
    const internalInactivate = () => {
        setLoading(true);
        Axios.put(`http://localhost:5000/api/internalevents/inactivate?token=${localStorage.getItem('token')}`,{
            id:_id
        }).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Inactive");
            setLoading(false);
        })
        .catch(err=>{
            // console.log(err)
            setLoading(false);
        })
    }
    const externalInactivate = () => {
        setLoading(true);
        Axios.put(`http://localhost:5000/api/externalevents/inactivate?token=${localStorage.getItem('token')}`,{
            id:_id
        }).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Inactive");
            setLoading(false);
        })
        .catch(err=>{
            // console.log(err)
            setLoading(false);
        })
    }
    return (
        <tr>
            <td>{type}</td>
            <td>{event}</td>
            <td>{subevents.join(", ")}</td>
            <td>{session}</td>
            <td>{newStatus === "Inactive"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {newStatus}</td>
            <td className="text-center">
                {newStatus === "Inactive"
                ?<button className="btn btn-success" onClick={
                    () => {type==="Internal"?internalActivate():externalActivate()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin p text-danger"/> : "Activate"}</button>
                :<button className="btn btn-danger" onClick={
                    () => {type==="Internal"?internalInactivate():externalInactivate()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin"/> : "Inactivate"}</button>}</td>
        </tr>
    )
}

export default EventsListItem;
