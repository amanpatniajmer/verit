import React from 'react';

const Modal = ({content, heading, setModal}) => {
    return (
        <div className='modal'>
            <div className='modalBox'>
                <div className='heading'>
                    {heading}
                    <i className='fa fa-close' onClick={()=>setModal(null)}></i>
                </div>
                <div className='content'>{content}</div>
            </div>
        </div>
    )
}

export default Modal;
