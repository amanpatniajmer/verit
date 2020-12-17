import React from 'react';

const ListItem = ({data, type}) => {
    const {club,event,session, status} = data;
    return (
        <tr>
            <td>{type}</td>
            <td>{club}</td>
            <td>{event || data.institute}</td>
            <td>{session}</td>
            <td>{status === "Unverified"
                ? <i className="fa fa-times-circle p text-danger"/>
                : <i className="fa fa-check-circle p text-success"/>}
                {status}</td>
            <td>{status === "Unverified"
            ? <button className="btn btn-danger">Withdraw{" "}
                <i className="fa fa-trash text-dark"/>
                </button>
            : null}</td>
        </tr>
    )
}

export default ListItem;
