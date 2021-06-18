import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import SubEvent from './SubEvent';
import Axios from 'axios';
import committees from '../../common/committees.json';

const AddInternal = ({ showalert }) => {

  const history = useHistory();
  const [keys, setKeys] = useState([]);
  const [club, setClub] = useState(committees[localStorage.getItem('name')]["Clubs"][0]);
  const [loading, setLoading] = useState(false);

  const delSubEvent = (key) => {
    let newKeys = [];
    for(let i = 0; i < keys.length; i++){
      if(keys[i] !== key) 
        newKeys.push(keys[i]);
    }
    setKeys(newKeys);
  }
  const addSubEvents = () => {
    setKeys([...keys, keys.length ? keys[keys.length - 1] + 1 : 0]);
  }
  const add = (e) => {
    e.preventDefault();
    setLoading(true);

    let formdata = new FormData(e.target);
    let object = {};

    formdata.forEach(function(value, key){
      object[key] = value;
    });
  
    Axios.post(`${process.env.REACT_APP_SERVER}/api/events/Internal`, object, {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }})
    .then(() =>{showalert("Internal event added.", "success"); 
                setLoading(false); 
                history.push('../'); })
    .catch((e) => {showalert((e.response && e.response.data) || "No connection established", "danger"); 
                   setLoading(false); })
    
  }
    return (
        <div>
          <form className = "form-container" onSubmit = {(e) => {add(e)}}>
          <span className = "close" onClick = {() => history.push('../')}><i className = "fa fa-times-circle"/></span>
            <h1 className = "text-primary">{" "}
            <span className = "text-dark">Add an </span> Internal Event{" "}
            </h1>
            <div className = "form-group">
              <label>Organization</label>
              <input type = "text" name = "organization" value = {localStorage.getItem('name')} readOnly/>
            </div>
            <div className = "form-group">
              <label>Event name</label>
              <input
                type = "text"
                name = "event"
                placeholder = "Enter name"
                autoComplete = "off"
                required
              />
            </div>
            
            {keys.map(i => {
              return <SubEvent key = {i} id = {i} delSubEvent = {delSubEvent}/>
              })}
            <div className = "form-group text-center">
            <button type = "button" className = "btn" onClick = {() => addSubEvents()}>Add Sub Event{" "}<span><i className = "fa fa-plus-circle" style = {{marginTop:"5px"}}/></span></button>
            </div>
            <div className = "form-group">
              <label>Session</label>
              <select name = "session" required = {true}>
                    <option value = "2020-21">2020-21</option>
                    <option value = "2019-20">2019-20</option>
                    <option value = "2018-19">2018-19</option>
              </select>
            </div>
            <div className = "form-group">
              <label>Club/Council</label>
              <select name = "club" value = {club} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setClub(val);}} 
                required = {true}>
                {committees[localStorage.getItem('name')]["Clubs"].map(
                                                            (item)=><option value = {item} key={item}>{item}</option>)}
              </select>
            </div>
            <button type = "submit" className = "btn btn-block btn-success">
               {loading ? <i className = "fa fa-spinner fa-spin"/> : "Add"}
            </button>
          </form>
        </div>
    )
}

export default AddInternal;
