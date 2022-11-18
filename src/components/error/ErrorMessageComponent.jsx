import React from 'react'

import { Link } from 'react-router-dom'

const ErrorMessageComponent = (props) => {

    return (<div className='error-wrapper'>
        <div className='error-container'>
            <h1>{props.title}</h1>
            <h1>{props.message}</h1>
            <h3>{props.status}</h3>
            <button className='orange-button'>
                <Link to="/" className='navlink'>Let me back</Link>
            </button>
        </div>
        </div>)
}

export default ErrorMessageComponent;