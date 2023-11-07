import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <div className='error-container'>
    <div className='title-container'>
        <h2 className='error-title'>4</h2>
        <h2 className='error-title'>4</h2>
    </div>
        <img src="https://i.gifer.com/origin/a8/a8cce7e5fb8f774dc79a06e3f727a070_w200.webp" alt="Pikachu" className='pikachu-running'/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png" className='error-image' alt="Pokeball" />
        <h2 className='error-message'>Page not found</h2>
        <Link to='/home' className='error-link'><button>Go back to Home</button></Link>
    </div>
    </>
  )
}

export default Error