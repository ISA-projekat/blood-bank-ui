import React from 'react'
import SurveyForm from '../../components/forms/SurveyForm';
import PageLayout from '../../components/Layout/MainLayout/PageLayout';
import './SurveyPage.scss';

const SurveyPage = () => {

    return (
        <PageLayout class={'survey-page'}>
            <div className='survey-page__header'>
                <h1>Health Status Survey</h1>
            </div>
            <div className='survey-page__form'>
                <SurveyForm />
            </div>
        </PageLayout>
    )
}

export default SurveyPage;