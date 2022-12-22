import React from 'react'
import SurveyForm from '../../components/forms/SurveyForm';
import './SurveyPage.scss';

const SurveyPage = () => {

    return (
        <div className='survey-page'>
            <div className='survey-page__header'>
                <h1>Health Status Survey</h1>
            </div>
            <div className='survey-page__form'>
                <SurveyForm />
            </div>
        </div>
    )
}

export default SurveyPage;