import React from 'react'

const Modal = ({content, heading}) => {
    return (
        <div className='modal'>
            <div className='modalBox'>
                <div className='heading'>
                    {heading}
                    <i className='fa fa-close'></i>
                </div>
                <div className='content'>{content}</div>
            </div>
        </div>
    )
}

export default Modal
