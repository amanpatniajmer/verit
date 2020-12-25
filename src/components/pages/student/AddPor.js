import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';


const AddPor = ({ showalert }) => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const [selections,setSelections]=useState({
    selectedOrganization: "Cultural Council",
    committees: {
        "Cultural Council":
        {
          "Clubs": ["Cultural Council", "Dance Club", "Fine Arts Club", "Indian Music Club", "Literary Club", "Quiz Club", "Theatre Club", "Western Music Club"]
        },
    
        "Kashiyatra":
        {
          "Clubs": ["KashiYatra"]
        },
    
        "Film and Media Council":
        {
          "Clubs": ["Film and Media Council", "Animation Club", "Cine Club", "Design Club", "Media Club", "Photography Club", "Social Outreach Club"]
        },
    
        "FMC Weekend":
        {
          "Clubs": ["FMC Weekend"]
        },
    
        "Games and Sports Council":
        {
          "Clubs": ["Games and Sports Council", "Aquatics", "Athletics", "Badminton", "Basketball", "Boxing", "Chess", "Cricket", "Football", "Handball", "Hockey", "Kabaddi", "Khokho", "Lawn Tennis", "Squash", "Table Tennis", "Taekwondo", "Volleyball", "Weightlifting"]
        },
    
        "Spardha":
        {
          "Clubs": ["Spardha"]
        },
    
        "Social Service Council":
        {
          "Clubs": ["Social Service Council", "Kashi Utkarsh", "Health and Hygiene Club", "Social Projects Club", "Sahyog"]
        },
    
        "Jagriti":
        {
          "Clubs": ["Jagriti"]
        },
    
        "Science and Technology Council":
        {
          "Clubs": [ "Science and Technology Council", "Aero-Modelling Club", "Astronomy Club", "Business Club", "Club of Programmers", "Club of Sustainibility and Innovation", "Robotics Club", "Society of Automotive Engineers"]
        },
    
        "Technex":
        {
          "Clubs": ["Technex"]
        },
    
        "Students' Parliament":
        {
          "Clubs": ["Students' Parliament", "PG Affairs", "Web Committee", "Security Committee", "Festival Committee", "Training and Placement", "Grievance & Redressal Committee", "UG Affairs", "Hostel Affairs Committee", " Infrastructure Committee", "Public Relations Committee", " Finance Committee"]
        },
    
        "E-Cell":
        {
          "Clubs": ["E-Cell", "Startup Weekend"]
        },
    
        "Training and Placement Cell":
        {
          "Clubs": ["Training and Placement Cell"]
        }
    }
  })
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
    .catch((e)=>{showalert("Error.", "danger");setLoading(false);})
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
                {selections.committees[selections.selectedOrganization]["Clubs"]
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
