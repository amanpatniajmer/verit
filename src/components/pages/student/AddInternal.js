import React, { useState} from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const AddInternal = () => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const add = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('./');
  }, 3000);
  }
  const fetchfields = (council) => {
    Axios.get(`http://localhost:5000/internalevents/${council}`)
      .then((res)=>{return res})
  }
    return (
        <div>
          <form className="form-container" onSubmit={(e)=>{add(e)}}>
          <span className="close" onClick={()=>history.push('./')}><i className="fa fa-times-circle"/></span>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add an </span> Internal Event{" "}
            </h1>
            <div className="form-group">
              <label>Club/Council</label>
              <select name="club" required={true}>
                <option value="Cultural Council" onChange={(e)=>{fetchfields(e.target.value)}}>Cultural Council</option>
                <option value="Indian Music Club">Indian Music Club</option>
                <option value="Western Music Club">Western Music Club</option>
                <option value="Fine Arts Club">Fine Arts Club</option>
                <option value="Theatre Club">Theatre Club</option>
                <option value="Dance Club">Dance Club</option>
                <option value="The Literary Club">The Literary Club</option>
                <option value="Quiz Club">Quiz Club</option>
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
              <label>Select Event</label>
              <select name="event"required={true}>
                <option value="Aagman">Aagman</option>
                <option value="Kashiyatra">Kashiyatra</option>
                <option value="Cultural Weekend">Cultural Weekend</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select Sub-Event</label>
              <select name="sub_event"required={true}>
                <option value="Aagman">Aagman</option>
                <option value="Kashiyatra">Kashiyatra</option>
                <option value="Cultural Weekend">Cultural Weekend</option>
              </select>
            </div>
            <div className="form-group">
              <label>Position</label>
              <select name="position">
                <option value="Participation">Participation</option>
                <option value="1">Winner</option>
                <option value="2">1st Runner Up</option>
                <option value="3">2nd Runner Up</option>
              </select>
            </div>
            <button type="submit" className="btn btn-block btn-success">
               {loading ? <i className="fa fa-spinner fa-spin"/> : "Apply for Verification"}
            </button>
          </form>
        </div>
    )
}

export default AddInternal;
