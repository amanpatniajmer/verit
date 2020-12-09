import React, {useState} from 'react'
import { useHistory } from "react-router-dom";


const AddExternal = () => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const add = (e) =>{
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
            <span className="text-dark">Add an </span> External Event{" "}
            </h1>
            <div className="form-group">
            <div className="form-group">
              <label>Council</label>
              <select required={true}>
                <option>Cultural Council</option>
                <option>Film and Media Council</option>
                <option>Science and Technology Council</option>
                <option>Social Service Council</option>
                <option>Games and Sports Council</option>
              </select>
            </div>
              <label>Organizing Institute</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label>Fest name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
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
              <label>Event name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label>Sub-Event name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <select>
                <option>Participation</option>
                <option>Winner</option>
                <option>1st Runner Up</option>
                <option>2nd Runner Up</option>
              </select>
            </div>
            <button type="submit" className="btn btn-block btn-success">
              {loading ? <i className="fa fa-spinner fa-spin"/> : "Apply for Verification"}
            </button>
          </form>
        </div>
    )
}

export default AddExternal;
