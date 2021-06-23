import React from 'react';

const SubEvent = ({id, delSubEvent}) => {
    return (
         <div>
            <div className = "form-group">
              <label>Sub-Event</label>
              <div className = "sub-event-list">
                <input
                  type = "text"
                  name = {"sub_event" + id}
                  placeholder = "Enter name"
                  autoComplete = "off"
                  required
                />
                <i className = "fa fa-times-circle" onClick = {() => delSubEvent(id)}/>
              </div>
            </div>
        </div>
    )
}

export default SubEvent;
