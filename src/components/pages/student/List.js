import React, { useEffect,useState } from 'react'
import ListItem from "./ListItem";
import Filters from "./Filters";
import Axios from 'axios';
const List = () => {
    const [data,setData]=useState(null);
    /* const data1 = [{
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
    }] */
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/apply?token=${localStorage.getItem("token")}`)
        .then((res)=>{
            console.log(res.data); 
            setData(res.data);
        })
        .catch((e)=>{console.log('Problem'+e.response);})
    }, [])
    
    
    return (
        <div style={{ display:"grid", placeContent: "center", marginBottom: "16px" }}>
            <Filters/>
            <h2 className="text-center text-dark" style={{ margin: "10px 0px" }}>Verification List</h2>
            <table >
                <thead><tr>
                    <th className="text-center text-dark">Type</th>
                    <th className="text-center text-dark">Club</th>
                    <th className="text-center text-dark">Event</th>
                    <th className="text-center text-dark">Session</th>
                    <th className="text-center text-dark">Status</th>
                    <th className="text-center text-dark">Action</th>
                </tr></thead>
                <tbody>
                    {data && data['internal'] && data['internal'].map((i)=><ListItem data={i} type="Internal" key={i._id}/>)}
                    {data && data['external'] && data['external'].map((i)=><ListItem data={i} type="External" key={i._id}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default List
