import React, { useState, useEffect } from 'react';
import { resolveEnvPrefix } from 'vite';
import { useNavigate } from 'react-router-dom'; 


const TopBar: React.FC =() => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target[0].value);
    // setTestDescribe(event.target[0].value);
    navigate('/');
}
    return(
      <div className="topBar">
        <div className="topBar__logo">
          <h1>TRYDENT</h1>
        </div>
        <div className="Title">
          <button onClick={ handleSubmit }>New Test</button>
        </div>
      </div>
    )
}   

export default TopBar;
