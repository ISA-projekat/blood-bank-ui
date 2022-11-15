import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const ForbiddenPage = () => {

    return (<div className='pages-wrapper'>
        <ErrorMessageComponent title={'Error 401 Forbidden'} message={'You shall not pass'} />
    </div>)
}

export default ForbiddenPage;