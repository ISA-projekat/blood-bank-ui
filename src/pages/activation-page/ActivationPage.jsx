import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';
import { activateAccount } from '../../services/user/UserService';
import './ActivationPage.scss';

const ActivationPage = () => {

    let { email } = useParams();
    const navigate = useNavigate();

    const handleActivate = () => {
        console.log(email)
        activateAccount(email).then((response) => {
            toast.success("Account succesffully activated!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/login')
        })
    }

    return (
        <div className='activation-container'>
            <h1>Activate your account by clicking on this link</h1>
            <button className='orange-button btn-submit' onClick={handleActivate}>Activate</button>
        </div>)
}

export default ActivationPage;