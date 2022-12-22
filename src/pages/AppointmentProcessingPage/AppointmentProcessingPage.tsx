import { useState } from "react";
import { useParams } from "react-router";
import {
  AppointmentReviewDto,
  BloodStock,
} from "../../store/appointment/Types";
import * as appointmentService from "../../services/AppointmentService";
import "./AppointmentProcessingPage.css";

const AppointmentProcessingPage = () => {
  const { id } = useParams();
  const [equipmentSetsUsed, setEquipmentSetsUsed] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [rhFactor, setRhFactor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [enterDetailsInProgress, SetEnterDetailsInProgress] =
    useState<boolean>(false);

  const reviewAppointment = (status: string) => {
    const bloodStock: BloodStock = {
      type: type,
      rhFactor: rhFactor,
      quantity: quantity,
    };

    const appointment: AppointmentReviewDto = {
      id: parseInt(id || "0"),
      status: status,
      equipmentSetsUsed: equipmentSetsUsed,
      bloodStock: bloodStock,
      description: description,
    };

    if (!type) appointment.bloodStock.type = null;
    else if (!["A", "B", "AB", "O"].includes(type)) return;
    if (!rhFactor) appointment.bloodStock.rhFactor = null;
    else if (!["PLUS", "MINUS"].includes(rhFactor)) return;

    appointmentService
      .reviewAppointment(appointment)
      .then((res) => console.log("Appointment reviewed successfully"));
  };

  return (
    <div className="appointment-processing-wrapper">
      {!enterDetailsInProgress && (
        <div>
          <button onClick={() => reviewAppointment("CANCELED")}>Cancel</button>
          <button onClick={() => reviewAppointment("NOT_ALLOWED")}>
            Not allow
          </button>
          <button
            onClick={() => SetEnterDetailsInProgress(!enterDetailsInProgress)}
          >
            Finish and enter details
          </button>
        </div>
      )}
      {enterDetailsInProgress && (
        <div>
          <label>
            Number of equipment sets used:
            <input
              type={"number"}
              value={equipmentSetsUsed}
              onChange={(e) => {
                setEquipmentSetsUsed(parseInt(e.target.value) || 0);
              }}
            />
          </label>
          <br />
          <label>
            Appointment summary:
            <input
              type={"text"}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Blood type(A, B, AB or O):
            <input
              type={"text"}
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Blood rh factor(PLUS or MINUS):
            <input
              type={"text"}
              value={rhFactor}
              onChange={(e) => {
                setRhFactor(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Amount of blood donated:
            <input
              type={"number"}
              value={quantity}
              onChange={(e) => {
                setQuantity(parseFloat(e.target.value) || 0);
              }}
            />
          </label>
          <button onClick={() => reviewAppointment("FINISHED")}>
            Finish the appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentProcessingPage;
