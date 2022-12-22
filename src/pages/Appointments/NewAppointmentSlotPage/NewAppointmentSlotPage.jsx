import React, { useContext, useEffect, useState } from 'react'
import { getById } from '../../../services/user/UserService';
import AuthContext from '../../../store/bloodbank/login/login-context';

const NewAppointmentSlotPage = () => {

    const [bloodBankId, setBloodBankId] = useState(0);
    const context = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const response = await getById(context.user.id);

        setBloodBankId(response.data.bloodBankId);
    }

    return (
        <div className='pages-wrapper'>
            <div className='new-slot-container'>
                <div className='blood-bank-details'>
                    {bloodBankId}
                </div>
                <div className='blood-bank-form'>
                    
                </div>
            </div>
        </div>
    )
}

export default NewAppointmentSlotPage;