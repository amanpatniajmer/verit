import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import SubEvent from './SubEvent';

const AddInternal = () => {
  const history=useHistory();
  const [count,increaseCount]=useState(0);
  const [keys,setKeys]=useState([]);
  const [loading, setLoading] = useState(false);
  const delSubEvent = (key) =>{
    let a=[];
    for(let i=0;i<keys.length;i++){
      if(keys[i]!==key) a.push(keys[i]);
    }
    setKeys(a);
  }
  const addSubEvents= ()=>{
    setKeys([...keys,count]);
    increaseCount(count+1);
  }
  
  const add = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('./');
  }, 3000);
  }
    return (
        <div>
          <form className="form-container" onSubmit={(e)=>{add(e)}}>
          <span className="close" onClick={()=>history.push('./')}><i className="fa fa-times-circle"/></span>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add an </span> Internal Event{" "}
            </h1>
            <div className="form-group">
              <label>Event name</label>
              <input
                type="text"
                name="name"
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
              <select required={true}>
                <option>2020-21</option>
                <option>2019-20</option>
                <option>2018-19</option>
              </select>
            </div>
            <div className="form-group">
              <label>Club/Council</label>
              <select required={true}>
                <option>Cultural Council</option>
                <option>Indian Music Club</option>
                <option>Western Music Club</option>
                <option>Fine Arts Club</option>
                <option>Theatre Club</option>
                <option>Dance Club</option>
                <option>The Literary Club</option>
                <option>Quiz Club</option>
              </select>
            </div>
            <button type="submit" className="btn btn-block btn-success">
               {loading ? <i className="fa fa-spinner fa-spin"/> : "Add"}
            </button>
          </form>
        </div>
    )
}

export default AddInternal;
