import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'
import { useLocation } from 'react-router'

const BadRequestPage = () => {

    const location = useLocation()
    const { message } = location.state

    return (<div className='pages-wrapper'>
        <ErrorMessageComponent title={'Error 400 Bad Request'} message={message}/>
    </div>)
}

export default BadRequestPage;