import React from 'react'

const ListItem = ({data}) => {
    const {roll,name,club,event,session, status}=data;
    return (
        <tr>
            <td>{roll}</td>
            <td>{name}</td>
            <td>{club}</td>
            <td>{event}</td>
            <td>{session}</td>
            <td>{status==="Unverified"
                ?<i className="fa fa-times-circle p text-danger"/>
                :<i className="fa fa-check-circle p text-success"/>}
                {status}</td>
            <td className="text-center">
                {status==="Unverified"
                ?<button className="btn btn-success">Verify</button>
                :<button className="btn">Unverify</button>}</td>
        </tr>
    )
}

export default ListItem
