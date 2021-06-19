import React from 'react';

const Alert = ({alert}) => {
  return (
    alert !== null && (
      <div className = {`alert alert-${alert.type}`} 
      style = {{ display: "flex", justifyContent: "center", alignItems: "center"}} 
      >
        <i className = "fa fa-info-circle" />
        {alert.msg}
      </div>
  )
  )
}

export default Alert;
