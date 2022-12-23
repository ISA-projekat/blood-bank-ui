import React, { useContext, useEffect, useState } from 'react'
import { cancelAppointment, getAppointmentsForUser } from '../../../services/appointments/AppointmentService';
import AuthContext from '../../../store/bloodbank/login/login-context';
import './UserCalendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { toast } from 'react-toastify';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const UserCalendar = () => {

    const context = useContext(AuthContext);
    const [apps, setApps] = useState([])
    const [requestData, setRequestData] = useState(new Date());


    const [selected, setSelected] = useState();

    const handleSelected = (event) => {
        setSelected(event);
        console.info('[handleSelected - event]', event);
    }

    const handleCancelation = async () => {
        const response = await cancelAppointment(selected.id)
        if(!response || !response.ok) {
            return;
        }

        setRequestData(new Date());
        toast.success("Appointment succesfully canceled!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    useEffect(() => {
        fetchData();
    }, [requestData])

    const fetchData = async () => {
        const response = await getAppointmentsForUser(context.user.id);
        const result = makeCalendarItems(response.data)
        setApps(result);
    }

    const createDate = (array) => {
        return new Date(array[0],array[1]-1,array[2],array[3], array[4])
    }

    function makeCalendarItems(appointments) {

        let result = []
        appointments.forEach((app)=>{
            let singleItem = {
                id: app.id,
                title: app.appointmentSlot.bloodBank.name,
                start: createDate(app.appointmentSlot.dateRange.start),
                end: createDate(app.appointmentSlot.dateRange.end)
            }
            result.push(singleItem);
        })

        return result;
    }

    return (
        <div className='calendar-container'> 
        <div className='header'>
            My calendar
        </div>
        <div className='button-group'>
            <button className='button-small bg-red' disabled={!selected} onClick={handleCancelation}>cancel</button>
        </div>
        <div className='calendar-wrapper'>
            <Calendar localizer={localizer} events={apps}
             startAccessor="start" endAccessor="end"
             selected={selected}
             onSelectEvent={handleSelected}
               />
        </div>
        </div>
    )
}

export default UserCalendar;