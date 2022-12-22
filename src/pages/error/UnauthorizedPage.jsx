import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const UnauthorizedPage = () => {

    return (
        <ErrorMessageComponent title={'Error 401 Unauthorized'} message={'You cant handle this bro'} />
    )
}

export default UnauthorizedPage;