import React, { useState, useEffect } from 'react';
import { resolveEnvPrefix } from 'vite';

const TopBar: React.FC =() => {
    return(
        <div className="topBar">
            <div className="topBar__logo"></div>
            <div className="Title">
                <h1>TRYDENT</h1>
            </div>
        </div>
    )
}   

export default TopBar;