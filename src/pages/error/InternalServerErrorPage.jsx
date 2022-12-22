import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const InternalServerErrorPage = () => {

    return (
        <ErrorMessageComponent title={'Whoops! 500 Internal Server Error'} message={'Our service provider has made a mistake'} />
    )
}

export default InternalServerErrorPage;