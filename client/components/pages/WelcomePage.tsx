import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const WelcomePage: React.FC = () => {

    // const [testDescribe, setTestDescribe] = useState('');
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        // console.log(event.target[0].value);
        // setTestDescribe(event.target[0].value);
        navigate('/testPage');
    }

    return(
        <div className="welcomePage">
          <p> I'm in welcomePage.tsx</p>
                <textarea placeholder="describe statement"/>
                <button onClick={handleClick}>Start Test</button>
        </div>
    )
}

export default WelcomePage;
