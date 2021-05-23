import React, { useState } from 'react';
import Axios from 'axios';

const ListItem = ({data, updates, setUpdates}) => {
    const {club,event,session, status,_id,organization,date, type} = data;
    const [newStatus, setNewStatus] = useState(status)
    const [loading,setLoading]=useState(false)
    const withdraw = () =>{
        setLoading(true);
        Axios.delete(`${process.env.REACT_APP_SERVER}/api/apply/${organization}/${type}/${_id}`,{
            headers:{
              'x-auth-token': localStorage.getItem('token')
            }}).then(result=>{
            if(result.status===200 && result.statusText==="OK")
            setNewStatus("Deleted");
            setUpdates([...updates,data]);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
        })
    }
    return (
        <tr readOnly={newStatus==="Deleted"}>
            <td>{type}</td>
            <td>{club}</td>
            <td>{event || data.institute}{"_"}{data.position}</td>
            <td>{session}</td>
            <td>{new Date(date).toUTCString()}</td>
            <td>{newStatus === "Verified"
                ? <i className="fa fa-check-circle p text-success"/>
                : <i className="fa fa-times-circle p text-danger"/>}
                {newStatus}</td>
            <td>{newStatus === "Unverified"
            ? <button className="btn btn-dark" onClick={()=>{(!loading)&&withdraw()}}>
                {loading ? <i className="fa fa-spinner fa-spin p text-danger"/> : ""}
                <i className="fa fa-trash"/>
                </button>
            : null}</td>
        </tr>
    )
}

export default ListItem;
