import React from 'react'
import ListItem from "./ListItem";
import Filters from "./Filters";
const List = () => {
    const data1 = [{
        roll: 17173004,
        name: "Aman Jain",
        club: "Indian Music Club",
        event: "Aagman",
        session: "2019-20",
        status: "Verified"
    },{
        roll: 17035047,
        name: "Shreyash Baijal",
        club: "Dance Club",
        event: "Aagman",
        session: "2020-21",
        status: "Unverified"
    },{
        roll: 17045104,
        name: "Shreyas Gupta",
        club: "Western Music Club",
        event: "Aagman",
        session: "2020-21",
        status: "Unverified"
    }]

    var rows=[];
    for (let i = 0; i < data1.length; i++) {
        rows.push(<ListItem data={data1[i]}  key={data1[i].roll+"_"+data1[i].event}/>)
    }
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            {/* <h4 className="text-center">Here goes the list</h4> */}
            <Filters/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Roll No</th>
                    <th className="text-center text-dark">Name</th>
                    <th className="text-center text-dark">Club</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Actions</th>
                </tr></thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default List
