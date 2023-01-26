import React from 'react';
import RegistrationForm from '../../components/forms/RegistrationForm';
import PageLayout from '../../components/Layout/MainLayout/PageLayout';
import './RegistrationPage.scss';

const RegistrationPage = () => {
    return(
    <PageLayout class={'registration'}>
        <div className='registration__header'>
            <h1> Become a blood donor </h1>
        </div>
        <div className='registration__form'>
            <RegistrationForm />
        </div>
    </PageLayout>)
}

export default RegistrationPage;