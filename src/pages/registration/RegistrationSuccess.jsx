import React from "react";
import ErrorMessageComponent from "../../components/error/ErrorMessageComponent";

const RegistrationSuccess = () => {

    return (
        <div className="pages-wrapper">
            <ErrorMessageComponent 
                title={'Registration successful'} 
                message={'Please confirm your registartion by activating link that has been sent to your email address'}
            />
        </div>)
}

export default RegistrationSuccess; 