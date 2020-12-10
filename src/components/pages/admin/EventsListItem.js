import React, {useState} from 'react';

const EventsListItem = ({data,id,setdata}) => {
    const {event,session, status} = data;
    const [loading, setLoading] = useState(false)
    const [newStatus, setNewStatus] = useState(status);
    const verify = () =>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNewStatus("Active");
        }, 2000);
    }
    const unverify = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNewStatus("Inactive");
        }, 2000);
    }
    return (
        <tr>
            <td>{event}</td>
            <td>{session}</td>
            <td>{newStatus === "Inactive"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {newStatus}</td>
            <td className="text-center">
                {newStatus === "Inactive"
                ?<button className="btn btn-success" onClick={
                    () => {verify()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin p text-danger"/> : "Activate"}</button>
                :<button className="btn btn-danger" onClick={
                    () => {unverify()}
                }>
                {loading ? <i className="fa fa-spinner fa-spin"/> : "Inactivate"}</button>}</td>
        </tr>
    )
}

export default EventsListItem;
