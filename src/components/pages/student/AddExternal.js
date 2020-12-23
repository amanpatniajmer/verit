import React, { useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const AddExternal = () => {
  const history=useHistory();
  const [loading, setLoading] = useState(false);
  const [selections,setSelections]=useState({
    organization:"Cultural Council",
    club:"Cultural Council",
    session:"2020-21",
    events:[],
    subevents:[],
    selectedEvent:'',
    selectedSubevent:''
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
    Axios.post(`http://localhost:5000/api/apply/${object.organization}/external`,object,{
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }})
    .then((res)=>{console.log(res.data); setLoading(false); history.push('../');})
    .catch((e)=>{console.log('Problem'+e.response);setLoading(false);})
  }
  const fetchfields = (selections) => {
      Axios.get(`http://localhost:5000/api/externalevents/student?club=${selections.club}&session=${selections.session}&token=${localStorage.getItem('token')}`)
      .then((res)=>{
        let arr=[]
        let object={}
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].institute+"_"+res.data[i].event);
          object[res.data[i].institute+"_"+res.data[i].event]=res.data[i].subevents;
        }
        setSelections((prev)=>({...prev,events:arr}))
        setSelections((prev)=>({...prev,events:arr,selectedEvent:arr[0],subevents:object}))
        console.log(object)
      })
  }
  useEffect(()=>{
    fetchfields(selections)
    //eslint-disable-next-line
  },[selections.club,selections.session])
    return (
        <div>
          <form className="form-container" onSubmit={(e)=>{add(e)}}>
          <span className="close" onClick={()=>history.push('../')}><i className="fa fa-times-circle"/></span>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add an </span> External Event{" "}
            </h1>
            <div className="form-group">
              <label>Council</label>
              <select name="organization" value={selections.organization} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,"organization":val}))
                }} required={true}>
                <option value="Cultural Council">Cultural Council</option>
                <option value="Film and Media Council">Film and Media Council</option>
                <option value="Games and Sports Council">Games and Sports Council</option>
                <option value="Social Service Council">Social Service Council</option>
                <option value="Science and Technology Council">Science and Technology Council</option>
                <option value="E-Cell">E-Cell</option>
              </select>
            </div>
            <div className="form-group">
              <label>Club/Council</label>
              <select name="club" value={selections.club} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,"club":val}))
                /* fetchfields(selections); */
                }} required={true}>
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
            <div className="form-group">
              <label>Session</label>
              <select name="session" value={selections.session} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,"session":val}));
                /* fetchfields(selections); */
                }} required={true}>
                    <option value="2020-21">2020-21</option>
                    <option value="2019-20">2019-20</option>
                    <option value="2018-19">2018-19</option>
              </select>
            </div>
            <div className="form-group">
              <label>Institute_Event</label>
              <select name="institute" required={true} value={selections.selectedEvent} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,selectedEvent:val}))
                /* setEvent(val)
                setSubevents(allsubevents[val]) */
                }}>
              {selections.events && selections.events.map((i)=> <option value={i} key={i}>{i}</option>)}
              </select>
            </div>
            {/* <div className="form-group">
              <label>Event name</label>
              <select name="event"required={true} value={event} onChange={(e)=>{
                setEvent(e.target.value)
                setSubevents(allsubevents[e.target.value])
                }}>
              {events && events.map((i)=> <option value={i} key={i}>{i}</option>)}
              </select>
            </div> */}
            <div className="form-group">
            <label>Select Sub-Event</label>
              <select name="sub_event" value={selections.selectedSubevent} onChange={(e)=>{
                const val=e.target.value;
                setSelections((prev)=>({...prev,selectedSubevent:val}))
                /* setEvent(val)
                setSubevents(allsubevents[val]) */
                }}required={true}>
              {selections.subevents[selections.selectedEvent] && selections.subevents[selections.selectedEvent].map((i)=> <option value={i} key={i} >{i}</option>)}
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
            <button type="submit" disabled={loading} className="btn btn-block btn-success">
              {loading ? <i className="fa fa-spinner fa-spin"/> : "Apply for Verification"}
            </button>
          </form>
        </div>
    )
}

export default AddExternal;
