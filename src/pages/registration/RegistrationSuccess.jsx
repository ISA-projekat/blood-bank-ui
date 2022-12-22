import React from "react";
import ErrorMessageComponent from "../../components/error/ErrorMessageComponent";

const RegistrationSuccess = () => {

    return (
            <ErrorMessageComponent 
                title={'Registration successful'} 
                message={'Please confirm your registartion by activating link that has been sent to your email address'}
            />)
}

export default RegistrationSuccess; 