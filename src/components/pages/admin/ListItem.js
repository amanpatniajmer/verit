import React, {useState} from 'react';

const ListItem = ({data,id,setdata}) => {
    const {roll,name,club,event,session, status} = data;
    const [loading, setLoading] = useState(false)
    const [newStatus, setNewStatus] = useState(status);
    const verify = () =>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNewStatus("Verified");
        }, 2000);
    }
    const unverify = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNewStatus("Unverified");
        }, 2000);
    }
    return (
        <tr>
            <td>{roll}</td>
            <td>{name}</td>
            <td>{club}</td>
            <td>{event}</td>
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
