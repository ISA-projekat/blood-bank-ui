import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const ForbiddenPage = () => {

    return (
        <ErrorMessageComponent title={'Error 403 Forbidden'} message={'You shall not pass'} />
    )
}

export default ForbiddenPage;