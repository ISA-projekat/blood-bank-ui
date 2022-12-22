import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const UnauthorizedPage = () => {

    return (<div className='pages-wrapper'>
        <ErrorMessageComponent title={'Error 401 Unauthorized'} message={'You cant handle this bro'} />
    </div>)
}

export default UnauthorizedPage;