import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";

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


const AdminCalendarView = () => {
    
    const [allEvents, setAllEvents] = useState(events);
    
    return ( 
        <div>
            <Calendar localizer={localizer} events={allEvents}
             startAccessor="start" endAccessor="end"
              style={{ height: 500, margin: "50px" }} />
        </div>
     );
}
 
export default AdminCalendarView;