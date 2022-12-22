import { useEffect, useState } from "react";
import { AppointmentPreviewDto } from "../../store/appointment/Types";
import * as appointmentService from "../../services/AppointmentService";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { routes } from "../../constants/routes";

const UsersAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState<AppointmentPreviewDto[]>([]);

  useEffect(() => {
    fetchAppointmentsByUserId(parseInt(id || "0"));
  }, []);

  const fetchAppointmentsByUserId = async (userId: number) => {
    await appointmentService
      .getAllByUser(userId)
      .then((resp) => setAppointments(resp.data));
  };

  const formatDateString = (stringDate: string) => {
    const date = stringDate.toString();
    return `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(
      8,
      10
    )} ${date.slice(11, 13)}:${date.slice(14, 16)}`;
  };

  return (
    <div>
      {appointments.map((a) => {
        return (
          <div>
            <ul>
              <li>{a.bloodBankId}</li>
              <li>{a.bloodBankName}</li>
              <li>Start: {formatDateString(a.startTime)}</li>
              <li>End: {formatDateString(a.endTime)}</li>
            </ul>
            <NavLink to={`${routes.APPOINTMENT_PROCESSING_PATH}/${a.id}`}>
              <button>Review this appointment</button>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default UsersAppointments;
