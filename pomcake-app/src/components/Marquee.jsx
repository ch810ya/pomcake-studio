import React from 'react';
import './Marquee.css';

const Marquee = ({ text }) => {
    return (
        <div className="marquee-container">
            <div className="marquee-content">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    );
};

export default Marquee;
