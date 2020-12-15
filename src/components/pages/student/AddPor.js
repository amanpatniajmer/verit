import React, {useState} from 'react'
import { useHistory } from "react-router-dom";


const AddPor = () => {
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
          <span className="close" onClick={()=>history.push('../')}><i className="fa fa-times-circle"/></span>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add a </span> POR{" "}
            </h1>
            <div className="form-group">
              <label>Organization</label>
              <select required={true}>
                <option>Cultural Council</option>
                <option>Film and Media Council</option>
                <option>Science and Technology Council</option>
                <option>Social Service Council</option>
                <option>Games and Sports Council</option>
                <option>Parliament</option>
                <option>E-Cell</option>
                <option>Training and Placement Cell</option>
              </select>
            </div>
            <div className="form-group">
              <label>Committees</label>
              <select required={true}>
                <option>Indian Music Club</option>
                <option>Kashiyatra</option>
                <option>2018-19</option>
              </select>
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
              <label>Position of Responsibility</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
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
