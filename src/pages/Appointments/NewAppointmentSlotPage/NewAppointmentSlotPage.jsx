import React, { useContext, useEffect, useState } from 'react'
import { getById } from '../../../services/user/UserService';
import AuthContext from '../../../store/bloodbank/login/login-context';
import './NewAppointmentSlotPage.scss';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { createSlot } from '../../../services/appointments/AppointmentService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const NewAppointmentSlotPage = () => {

    const [bloodBankId, setBloodBankId] = useState(0);
    const [start, setStart] = useState(dayjs('2022-12-23T21:11:54'));
    const [end, setEnd] = useState(dayjs('2022-12-23T21:11:54'))
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const response = await getById(context.user.id);

        setBloodBankId(response.data.bloodBankId);
    }

    const handleStartChange = (newValue) => {
        setStart(newValue);
    };

    const handleEndChange = (newValue) => {
        setEnd(newValue);
    }

    const handleSubmit = async () => {
        let dateRange = {
            start: start.$d.toISOString(),
            end: end.$d.toISOString()
        } 

        const response = await createSlot({bloodBankId: bloodBankId, dateRange: dateRange});
        if(!response || !response.ok){
            return;
        }

        toast.success("Appointment slot successfully created!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        navigate(-1);
    }

    return (
            <div className='new-slot-container'>
                <div className='header'>
                    Create new appointment slot
                </div>
                <div className='form-wrapper-bb-form'>
                    <div className='blood-bank-form'>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                            className='item'
                            label="Date&Time picker"
                            value={start}
                            onChange={handleStartChange}
                            renderInput={(params) => <TextField {...params} />} />
                         </LocalizationProvider>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                            className='item'
                            label="Date&Time picker"
                            value={end}
                            onChange={handleEndChange}
                            renderInput={(params) => <TextField {...params} />} />
                         </LocalizationProvider>
                        <div className='item df'>
                            <button className='orange-button' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NewAppointmentSlotPage;