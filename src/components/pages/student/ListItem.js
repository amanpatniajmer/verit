import React, { useState } from 'react';
import Axios from 'axios';

const ListItem = ({data, type}) => {
    const {club,event,session, status,_id,organization,date} = data;
    const [newStatus, setNewStatus] = useState(status)
    const [loading,setLoading]=useState(false)
    const withdraw = () =>{
        setLoading(true);
        Axios.delete(`http://localhost:5000/api/apply/${organization}/${type}/${_id}`,{
            headers:{
              'x-auth-token': localStorage.getItem('token')
            }}).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Deleted");
            console.log(result.data)
            setLoading(false);
        })
        .catch(err=>{
            console.log(err)
            setLoading(false);
        })
    }
    return (
        <tr readOnly={newStatus==="Deleted"}>
            <td>{type}</td>
            <td>{club}</td>
            <td>{event || data.institute}</td>
            <td>{session}</td>
            <td>{new Date(date).toUTCString()}</td>
            <td>{status === "Unverified"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {status}</td>
            <td>{newStatus === "Unverified"
            ? <button className="btn btn-danger" onClick={()=>{(!loading)&&withdraw()}}>
                {loading ? <i className="fa fa-spinner fa-spin p text-danger"/> : "Withdraw "}
                <i className="fa fa-trash text-dark"/>
                </button>
            : null}</td>
        </tr>
    )
}

export default ListItem;
