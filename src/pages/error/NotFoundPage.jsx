import React from 'react'
import ErrorMessageComponent from '../../components/error/ErrorMessageComponent'

const NotFoundPage = () => {

    return (<div className='pages-wrapper'>
        <ErrorMessageComponent title={'Error 404 Hilton'} message={'Looks like there is nothing here for you :/'} />
    </div>)
}

export default NotFoundPage;