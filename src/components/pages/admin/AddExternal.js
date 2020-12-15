import React, { useState} from 'react'
import { useHistory } from "react-router-dom";
import SubEvent from "./SubEvent";
import Axios from 'axios';


const AddExternal = () => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const [keys,setKeys]=useState([]);
  const delSubEvent = (key) =>{
    let newKeys=[];
    for(let i=0;i<keys.length;i++){
      if(keys[i]!==key) newKeys.push(keys[i]);
    }
    setKeys(newKeys);
  }
  const addSubEvents= ()=>{
    setKeys([...keys,keys.length?keys[keys.length-1]+1:0]);
  }
  const add = (e) => {
    e.preventDefault();
    setLoading(true);
    let formdata=new FormData(e.target);
    let object = {};
    formdata.forEach(function(value, key){
      object[key] = value;
    });
  
    Axios.post('http://localhost:5000/api/externalevents',object,{
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }})
    .then((res)=>{console.log(res.data); setLoading(false); history.push('../');})
    .catch((e)=>{console.log('Problem'+e.response);setLoading(false);})
    
  }
    return (
        <div>
          <form className="form-container" onSubmit={(e)=>{add(e)}}>
          <span className="close" onClick={()=>history.push('../')}><i className="fa fa-times-circle"/></span>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add an </span> External Event{" "}
            </h1>
            <div className="form-group">
              <label>Organizing Institute</label>
              <input
                type="text"
                name="institute"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label>Event name</label>
              <input
                type="text"
                name="event"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
            </div>
            {keys.map(i=>{
              return <SubEvent key={i} id={i} delSubEvent={delSubEvent}/>
              })}
            <div className="form-group text-center">
            <button type="button" className="btn" onClick={()=>addSubEvents()}>Add Sub Event{" "}<span><i className="fa fa-plus-circle" style={{marginTop:"5px"}}/></span></button>
            </div>
            <div className="form-group">
              <label>Session</label>
              <select name="session" required={true}>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
              </select>
            </div>
            <div className="form-group">
              <label>Club/Council</label>
              <select name="club" required={true}>
                <option value="Cultural Council">Cultural Council</option>
                <option value="Indian Music Club">Indian Music Club</option>
                <option value="Western Music Club">Western Music Club</option>
                <option value="Fine Arts Club">Fine Arts Club</option>
                <option value="Theatre Club">Theatre Club</option>
                <option value="Dance Club">Dance Club</option>
                <option value="The Literary Club">The Literary Club</option>
                <option value="Quiz Club">Quiz Club</option>
              </select>
            </div>
            <button type="submit" className="btn btn-block btn-success">
              {loading ? <i className="fa fa-spinner fa-spin"/> : "Add"}
            </button>
          </form>
        </div>
    )
}

export default AddExternal;
