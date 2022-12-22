import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'
import { useLocation } from 'react-router'

const NotFoundPage = () => {

    const location = useLocation()
    const { message } = location.state

    return (
        <ErrorMessageComponent title={'Error 404 Hilton'} message={'Looks like there is nothing here for you :/'} status = {message}/>
    )
}

export default NotFoundPage;