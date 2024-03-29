import React from 'react';
import './FullPageLoader.css';

function FullPageLoader() {
    return (
        <React.Fragment>
            <div className="fullpage-loader-holder">
                <div className="fullpage-loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FullPageLoader;