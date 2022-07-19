


import React from 'react'

function Modal({ isOpen, onClose, onSubmit, title, message, children, submitText, cancelText }) {

    if (!isOpen) {
        return null
    }

  return (
    <div className='modal-container'>
    <div className='login-container relative-container'>
        <h1>{title}</h1>
        <button type="button" className="btn-close btn-close-white" id="close-button" onClick={onClose} aria-label="Close" ></button>
        <p>{message}</p>
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