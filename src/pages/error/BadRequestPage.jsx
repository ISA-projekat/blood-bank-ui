import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const BadRequestPage = () => {

    return (<div className='pages-wrapper'>
        <ErrorMessageComponent title={'Error 400 Bad Request'} message={'Check again my friend'} />
    </div>)
}

export default BadRequestPage;