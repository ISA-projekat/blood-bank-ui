import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useState, useEffect} from 'react'
import { getByBloodBank } from '../../services/appointment/AppointmentService';
import { NestCamWiredStandTwoTone } from '@mui/icons-material';
import { useContext } from 'react';
import AuthContext from '../../store/bloodbank/login/login-context';
import { getBloodBankId } from '../service/AdminService';
import './AdminCalendarView.scss';


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

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 11, 21),
        end: new Date(2022, 11, 25),
    },
    {
        title: "Vacation",
        start: new Date(2022, 10, 3, 12 ),
        end: new Date(2022, 10, 3, 17),
    },
    {
        title: "Conference",
        start: new Date(2022, 10, 3,13),
        end: new Date(2022, 10, 3, 16),
    },
];

const appointmentDtos=[];


const AdminCalendarView = () => {
    
    const [allEvents, setAllEvents] = useState(events);
    const [appointmentsCal,setAppointments] = useState([]);
    const [calendarItems,setCalendarItems] = useState([]);
   
    
    const context = useContext(AuthContext)
    //context.user.id

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        
        const bankId = await getBloodBankId(context.user.id)
        const response = await getByBloodBank(bankId.data);
        const result = makeCalendarItems(response.data)
        setAppointments(result);
        
    };

    function makeCalendarItems(appointments) {

        let result = []
        appointments.forEach((app)=>{
            let singleItem = {
                title: app.firstName +" "+ app.lastName,
                start: new Date(app.startDate[0], app.startDate[1]-1,app.startDate[2],app.startDate[3]),
                end: new Date(app.endDate[0], app.endDate[1]-1,app.endDate[2],app.endDate[3])
            }
            result.push(singleItem);
        })

        return result;
    }

    return (
        <div className='calendar-container'> 
        <div className='header'>
            Work calendar
        </div>
        <div className='calendar-wrapper'>
            <Calendar localizer={localizer} events={appointmentsCal}
             startAccessor="start" endAccessor="end"
               />
        </div>
        </div>
     );
}
 
export default AdminCalendarView;