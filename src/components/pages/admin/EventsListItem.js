import React, { useState } from 'react';
import Axios from 'axios';

const EventsListItem = ({ data, updates, setUpdates }) => {
    const { event, subevents, session, status, _id, type } = data;
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [newStatus, setNewStatus] = useState(status);
    const activate = () => {
                            setLoading(true);
                            Axios.put(`${process.env.REACT_APP_SERVER}/api/events/${type}/${_id}/activate?token=${localStorage.getItem('token')}`)
                                .then(result => {
                                    if (result.status === 200 && result.statusText === "OK"){
                                        setUpdates([...updates, {...data, status: "Active"}]);
                                        setNewStatus("Active");
                                    }
                                        
                                    setLoading(false);
                                })
                                .catch(err => {
                                    setLoading(false);
                                })
    }
    const inactivate = () => {
                              setLoading(true);
                              Axios.put(`${process.env.REACT_APP_SERVER}/api/events/${type}/${_id}/inactivate?token=${localStorage.getItem('token')}`)
                                    .then(result => {
                                        if (result.status === 200 && result.statusText === "OK"){
                                            setUpdates([...updates, {...data, status: "Inactive"}]);
                                            setNewStatus("Inactive");
                                        }
                                        setLoading(false);
                                    })
                                    .catch(err => {
                                        setLoading(false);
                                    })
    }
    const withdraw = () => {
                            setDeleteLoading(true);
                            Axios.delete(`${process.env.REACT_APP_SERVER}/api/events/${type}/${_id}`, {
                                headers: {
                                    'x-auth-token': localStorage.getItem('token')
                                }
                            }).then(result => {
                                if (result.status === 200 && result.statusText === "OK"){
                                    setUpdates([...updates, {...data, status: "Deleted"}]);
                                    setNewStatus("Deleted");
                                }
                                setDeleteLoading(false);
                            })
                                .catch(err => {
                                    setDeleteLoading(false);
                                })
    }
    return (
        <tr readOnly = {newStatus === "Deleted"}>
            <td>{type}</td>
            <td>{event}</td>
            <td>{subevents.join(", ")}</td>
            <td>{session}</td>
            <td>{newStatus === "Inactive" || newStatus === "Deleted"
                ? <i className = "fa fa-times-circle p text-danger" />
                : <i className = "fa fa-check-circle p text-success" />}
                {newStatus}
            </td>
            <td className = "text-center">
                {newStatus === "Inactive"
                    ? newStatus !== "Deleted" && <button className = "btn btn-success" 
                                                         onClick = {() => {activate()}
                    }>
                        {loading ? <i className = "fa fa-spinner fa-spin p text-danger" /> 
                                 : "Activate"}</button> 
                    : newStatus !== "Deleted" && <button className = "btn btn-danger" 
                                                         onClick={() => {inactivate()}
                    }>
                        {loading ? <i className = "fa fa-spinner fa-spin" /> 
                                 : "Inactivate"}</button>}

                {newStatus === "Inactive"
                    ? <button className = "btn btn-danger" 
                              onClick = {() => { (!deleteLoading) && withdraw() }}>
                      {deleteLoading ? <i className = "fa fa-spinner fa-spin" /> 
                                     : <i className = "fa fa-trash text-dark" style = {{ margin: "0" }} />}</button>
                    : null}

            </td>
        </tr>
    )
}

export default EventsListItem;
