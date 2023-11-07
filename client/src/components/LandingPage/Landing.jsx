import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = ()=>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/home')
    }

    return(
        <>
            <div className='container'>
                <h1 id='title'>Welcome to the PokeApp</h1>
                <button id='btn-start' onClick={handleClick}>START</button>
            </div>
        </>
    )
}

export default Landing; 