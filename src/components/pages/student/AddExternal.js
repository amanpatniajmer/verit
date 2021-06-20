import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import committees from '../../common/committees.json';

const AddExternal = ({ showalert }) => 
{
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState(
  {
    organization: "Cultural Council",
    clubs: committees["Cultural Council"]["Clubs"],
    selectedClub: committees["Cultural Council"]["Clubs"][0],
    session: "2020-21",
    events: [],
    subevents: [],
    selectedEvent: '',
    selectedSubevent: ''
  })
  const add = (e) => 
  {
    e.preventDefault();
    setLoading(true);
    let formdata = new FormData(e.target);
    let object = {};
    formdata.forEach(function(value, key){
      object[key] = value;
    });

    Axios.post(`${process.env.REACT_APP_SERVER}/api/apply/${object.organization}/external`, object, {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }})
    .then(() => {
                showalert("You have successfully applied for verification.", "success"); 
                setLoading(false); 
                history.push('../');})
    .catch((e) => {
                  showalert((e.response && e.response.data) || "No connection established", "danger");
                  setLoading(false);})
  }
  const fetchfields = (selections) => 
  {
      Axios.get(`${process.env.REACT_APP_SERVER}/api/events/External?club=${selections.selectedClub}&session=${selections.session}&token=${localStorage.getItem('token')}`)
      .then((res) => 
      {
        let arr = []
        let object = {}
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].institute + "_" + res.data[i].event);
          object[res.data[i].institute + "_" + res.data[i].event] = res.data[i].subevents;
        }
        setSelections((prev) => ({...prev, events: arr}))
        setSelections((prev) => ({...prev, events: arr, selectedEvent: arr[0], subevents: object}))
      })
  }

  useEffect(() => 
  {
    fetchfields(selections)
    //eslint-disable-next-line
  },[selections.selectedClub, selections.session, selections.organization])

    return (
        <div>
          <form className = "form-container" onSubmit = {(e) => {add(e)}}>
            <span className = "close" onClick = {() => history.push('../')}><i className = "fa fa-times-circle"/></span>
            <h1 className = "text-primary">{" "}
              <span className = "text-dark">Add an </span> External Event{" "}
            </h1>
            <div className = "form-group">
              <label>Council</label>
              <select 
                      name = "organization" 
                      value = {selections.organization} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setSelections((prev) => ({...prev, "organization": val, "clubs": committees[val]["Clubs"], "selectedClub": committees[val]["Clubs"][0]}))
                                          }} 
                      required = {true}>
                <option value = "Cultural Council">Cultural Council</option>
                <option value = "Film and Media Council">Film and Media Council</option>
                <option value = "Games and Sports Council">Games and Sports Council</option>
                <option value = "Social Service Council">Social Service Council</option>
                <option value = "Science and Technology Council">Science and Technology Council</option>
                <option value = "E-Cell">E-Cell</option>
              </select>
            </div>

            <div className = "form-group">
              <label>Club/Council</label>
              <select 
                      name = "club" 
                      value = {selections.selectedClub} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setSelections((prev)=>({...prev, "selectedClub": val}))
                                      }} 
                      required = {true}>
                {selections.clubs.map((item) => <option value = {item} key={item}>{item}</option>)}
              </select>
            </div>

            <div className = "form-group">
              <label>Session</label>
              <select 
                      name = "session" 
                      value = {selections.session} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setSelections((prev) => ({...prev, "session": val}));
                                          }} 
                      required = {true}>
                  <option value = "2020-21">2020-21</option>
                  <option value = "2019-20">2019-20</option>
                  <option value = "2018-19">2018-19</option>
              </select>
            </div>

            <div className = "form-group">
              <label>Institute_Event</label>
              <select 
                      name = "institute" 
                      required = {true} 
                      value = {selections.selectedEvent} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setSelections((prev) => ({...prev, selectedEvent: val}))
                                          }}>
                {selections.events && selections.events.map((i) => <option value = {i} key = {i}>{i}</option>)}
              </select>
            </div>

            <div className = "form-group">
              <label>Select Sub-Event</label>
              <select 
                      name = "sub_event" 
                      value = {selections.selectedSubevent} 
                      onChange = {(e) => {
                                          const val = e.target.value;
                                          setSelections((prev) => ({...prev, selectedSubevent: val}))
                                          }} 
                      required = {true}>
                {selections.subevents[selections.selectedEvent] && selections.subevents[selections.selectedEvent]
                  .map((i) => <option value = {i} key = {i} >{i}</option>)}
              </select>
            </div>

            <div className = "form-group">
              <label>Position</label>
              <select name = "position">
                <option value = "Participation">Participation</option>
                <option value = "1">Winner</option>
                <option value = "2">1st Runner Up</option>
                <option value = "3">2nd Runner Up</option>
              </select>
            </div>

            <button 
                    type = "submit" 
                    disabled = {loading} 
                    className = "btn btn-block btn-success">
              {loading ? <i className = "fa fa-spinner fa-spin"/> : "Apply for Verification"}
            </button>

          </form>
        </div>
    )
}

export default AddExternal;
