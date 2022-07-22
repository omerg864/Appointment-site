


import React from 'react';
import { MdDelete } from 'react-icons/md';

function Modal({ isOpen, onClose, onSubmit, title, message, children, submitText, cancelText, deleteButton, onDelete }) {

    if (!isOpen) {
        return null
    }

  return (
    <div className='modal-container'>
    <div className='login-container relative-container'>
        <h1>{title}</h1>
        <button type="button" className="btn-close btn-close-white" id="close-button" onClick={onClose} aria-label="Close" ></button>
        {deleteButton && 
        <button className={`delete-button top-left`} onClick={onDelete} name={`button-icon`}><MdDelete className="delete-icon" size={'24px'}/></button>}
        <p>
            {message}
        </p>
        <div>
            {children}
        </div>
        <div className='space-div'>
            <button onClick={onClose} className="btn btn-outline-light" id="button-outline">{cancelText}</button>
            <button onClick={onSubmit} className="btn btn-light" id="btn-sub">{submitText}</button>
        </div>
    </div>
    </div>
  )
}

export default Modal