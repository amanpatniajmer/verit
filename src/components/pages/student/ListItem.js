import React from 'react';

const ListItem = ({data}) => {
    const {club,event,session, status} = data;
    return (
        <tr>
            <td>{club}</td>
            <td>{event}</td>
            <td>{session}</td>
            <td>{status === "Unverified"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {status}</td>
        </tr>
    )
}

export default ListItem;
