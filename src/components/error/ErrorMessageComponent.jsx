import React from 'react'

import { Link } from 'react-router-dom'
import PageLayout from '../Layout/MainLayout/PageLayout';

const ErrorMessageComponent = (props) => {

    return (<div className='error-wrapper'>
        <PageLayout class={'error-container'}>
            <h1>{props.title}</h1>
            <h1>{props.message}</h1>
            <h3>{props.status}</h3>
            <Link to="/" className='navlink'><button className='button bg-orange'>
                Back to home page
            </button>
            </Link>
        </PageLayout>
        </div>)
}

export default ErrorMessageComponent;