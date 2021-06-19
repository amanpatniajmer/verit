import React from 'react';
import SVG from '../../img/dead-end.png'

const Forbidden = () => {
    return (
        <div className = "forbidden-main">
            <img src = {SVG} alt = "dead-end" className = "forbidden-img"/>
            <h2>You have reached a dead end. Contact the administrator.</h2>
        </div>
    )
}

export default Forbidden;
