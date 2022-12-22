import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'
import { useLocation } from 'react-router'

const BadRequestPage = () => {

    const location = useLocation()
    const { message } = location.state

    return (
        <ErrorMessageComponent title={'Error 400 Bad Request'} message={message}/>
    )
}

export default BadRequestPage;