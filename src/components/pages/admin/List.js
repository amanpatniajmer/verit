import React from 'react'
import ListItem from "./ListItem";
import Filters from "./Filters";
const List = () => {
    const data1=[{
        roll:17173004,
        name:"Aman Jain",
        club: "IMC",
        event:"Aagman",
        session:"2019-20",
        status:"Verified"
    },{
        roll:17173005,
        name:"Shreyash Baijal",
        club: "IMC",
        event:"Aagman",
        session:"2020-21",
        status:"Unverified"
    },{
        roll:17173005,
        name:"Shreyash Baijal",
        club: "IMC",
        event:"Aagman NOT",
        session:"2020-21",
        status:"Unverified"
    }]
    var rows=[];
    for (let i = 0; i < data1.length; i++) {
        rows.push(<ListItem data={data1[i]}  key={data1[i].roll+"_"+data1[i].event}/>)
    }
    return (
        <div>
            <h4 className="text-center">Here goes the list</h4>
            <Filters/>
            <table className="center">
                <thead><tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Club</th>
                    <th>Event-type</th>
                    <th>Session</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr></thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default List
