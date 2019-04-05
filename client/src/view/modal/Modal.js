import React from 'react';

import './Modal.css';

const modal = (props) => {
    const { modalOpen, close, children, header } = props;
    return (
        <div className="modal-wrapper"
             style={{
                 display: modalOpen ? 'block' : 'none'
             }}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">{ header }</span><span className="modal-close" onClick={close}>x</span>
                </div>
                {children}
            </div>
        </div>
    )
};

export default modal;