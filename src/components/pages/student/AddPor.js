import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import committees from './committees.json' ;

const AddPor = ({ showalert }) => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const [selections,setSelections]=useState({
    organizations:[],
    selectedOrganization: "",
    committees: committees
  })
  useEffect(() => {
    let tempArray=[];
    for(let i in selections.committees)
    tempArray.push(i);
    setSelections((prev)=>({...prev,organizations:tempArray,selectedOrganization:tempArray[0]}))
    //eslint-disable-next-line
  }, [])
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
    .then((res)=>{showalert("You have successfully applied for verification.", "success"); setLoading(false); history.push('../');})
    .catch((e)=>{showalert((e.response && e.response.data) || "No connection established", "danger"); setLoading(false);})
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
              <select required={true} value={selections.selectedOrganization} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,selectedOrganization:val}));
              }} name="organization">
                {selections.organizations && selections.organizations.map((i)=>
                  <option value={i} key={i}>{i}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Committees</label>
              <select name="club" required={true}>
                {selections.selectedOrganization && selections.committees[selections.selectedOrganization]["Clubs"]
                 && selections.committees[selections.selectedOrganization]["Clubs"].map((i)=> <option value={i} key={i} >{i}</option>)}
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
