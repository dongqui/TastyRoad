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
                {children}
            </div>
        </div>
    )
};

export default modal;