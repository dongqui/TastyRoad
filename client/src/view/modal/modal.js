import React from 'react';

import './modal.css';

const modal = (props) => {
    const { modalOpen, children } = props;
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