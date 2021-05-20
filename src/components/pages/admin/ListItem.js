import React, {useState} from 'react';
import Axios from 'axios';

const ListItem = ({data,id,setdata}) => {
    const {roll,name,club,event,session, status,_id,subevent,position, type} = data;
    const [loading, setLoading] = useState(false)
    const [newStatus, setNewStatus] = useState(status);
    const verify = () =>{
        setLoading(true);
        Axios.put(`${process.env.REACT_APP_SERVER}/api/apply/verify?token=${localStorage.getItem('token')}`,{
            id:_id,
            organization:localStorage.getItem('name'),
            type:type
        }).then(result=>{
            setNewStatus("Verified");
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
        })
    }
    const unverify = () =>{
        setLoading(true);
        Axios.put(`${process.env.REACT_APP_SERVER}/api/apply/unverify?token=${localStorage.getItem('token')}`,{
            id:_id,
            organization:localStorage.getItem('name'),
            type:type
        }).then(result=>{
            setNewStatus("Unverified");
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
        })
    }
    return (
        <tr>
            <td>{type}</td>
            <td>{roll}</td>
            <td>{name}</td>
            <td>{club}</td>
            <td>{event || data.institute}</td>
            <td>{subevent}</td>
            <td>{position}</td>
            <td>{session}</td>
            <td>{newStatus === "Unverified"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {newStatus}</td>
            <td className="text-center">
                {newStatus === "Unverified"
                ?<button className="btn btn-success" onClick={
                    () => {verify()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin p text-danger"/> : "Verify"}</button>
                :<button className="btn btn-danger" onClick={
                    () => {unverify()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin"/> : "Unverify"}</button>}</td>
        </tr>
    )
}

export default ListItem;
