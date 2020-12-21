import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';


const AddPor = () => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const add = (e) => {
    e.preventDefault();
    setLoading(true);
    let formdata=new FormData(e.target);
    let object = {};
    formdata.forEach(function(value, key){
      object[key] = value;
    });
    console.log(object)
    Axios.post(`http://localhost:5000/api/apply/${object.organization}/por`,object,{
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
            <span className="text-dark">Add a </span> POR{" "}
            </h1>
            <div className="form-group">
              <label>Organization</label>
              <select required={true} name="organization">
                <option value="Cultural Council">Cultural Council</option>
                <option value="Film and Media Council">Film and Media Council</option>
                <option value="Games and Sports Council">Games and Sports Council</option>
                <option value="Social Service Council">Social Service Council</option>
                <option value="Science and Technology Council">Science and Technology Council</option>
                <option value="E-Cell">E-Cell</option>
                <option value="Kashiyatra">Kashiyatra</option>
                <option value="Technex">Technex</option>
                <option value="Spardha">Spardha</option>
              </select>
            </div>
            <div className="form-group">
              <label>Committees</label>
              <select name="club" required={true}>
                <option>Indian Music Club</option>
                <option>Kashiyatra</option>
                <option>2018-19</option>
              </select>
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
              <label>Event name</label>
              <input
                type="text"
                name="event"
                placeholder="Enter name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Sub-Event name</label>
              <input
                type="text"
                name="sub_event"
                placeholder="Enter name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Position of Responsibility</label>
              <input
                type="text"
                name="position"
                placeholder="Enter name"
                autoComplete="off"
                required={true}
              />
            </div>
            <button type="submit" className="btn btn-block btn-success">
              {loading ? <i className="fa fa-spinner fa-spin"/> : "Apply for Verification"}
            </button>
          </form>
        </div>
    )
}

export default AddPor;
