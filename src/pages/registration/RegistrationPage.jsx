import React from 'react';
import RegistrationForm from '../../components/forms/RegistrationForm';
import './RegistrationPage.scss';

const RegistrationPage = () => {
    return(
    <div className='registration'>
        <div className='registration__header'>
            <h1> Become a blood donor </h1>
        </div>
        <div className='registration__form'>
            <RegistrationForm />
        </div>
    </div>)
}

export default RegistrationPage;