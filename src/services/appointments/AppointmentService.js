import { makeParametersList, request } from "../../components/base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getAppointmentSlotsForBloodBank(bloodBankId) {
  return await request("/appointment-slot/blood-bank/" + bloodBankId);
}

export async function getAppointmentsForBloodBank(dto) {
  return await request(
    "/appointment-slot/blood-bank-page" + makeParametersList(dto)
  );
}

export async function getFreeAppointmentSlotsForBloodBank(dto) {
  return await request(
    "/appointment-slot/blood-bank-page-free" + makeParametersList(dto)
  );
}

export async function getAppointmentsForUser(userId) {
  return await request("/appointment/user/" + userId);
}

export async function scheduleAppointment(dto) {
  return await request("/appointment/schedule", dto, HttpMethod.POST);
}

export async function cancelAppointment(id) {
  return await request("/appointment/cancel/" + id, HttpMethod.DELETE);
}

export async function deleteSlot(id) {
  return await request("/appointment-slot/" + id, {}, HttpMethod.DELETE);
}
