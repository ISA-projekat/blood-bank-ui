import React from 'react'
import './LoginPage.scss'
import LoginForm from '../../components/forms/LoginForm';

const LoginPage = () => {


    return (
        <div className='login-container'>
            <div className='login-content'>
                <div className='form-container'>
                    <div className='login-content__form'>
                    <div className='login-header'>
                        <h1>Welcome back, please enter your credentials</h1>
                    </div>
                    <LoginForm />
                </div>
                </div>
                <div className='login-content__image'>

                </div>
            </div>
        </div>
    );
};


export default LoginPage;