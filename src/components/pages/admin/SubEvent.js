import React from 'react'

const SubEvent = ({id,delSubEvent}) => {
    return (
        <div>
            <div className="form-group">
            <label>Sub-Event</label>
              <div  style={{display:"flex", justifyContent:"stretch"}}>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                style={{width:"95%"}}
                required
              />
              <i style={{fontSize:"1.5rem", marginTop:"1rem", marginLeft:"0.5rem", cursor:"pointer"}} className="fa fa-times-circle" 
              onClick={()=>delSubEvent(id)}/>
              </div>
            </div>
        </div>
    )
}

export default SubEvent
