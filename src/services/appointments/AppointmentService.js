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
  return await request("/appointment/user/" + userId + "/SCHEDULED");
}

export async function getFinishedAppointmentsForUser(userId) {
  return await request("/appointment/user/" + userId + "/FINISHED");
}

export async function scheduleAppointment(dto) {
  return await request("/appointment/schedule", dto, HttpMethod.POST);
}

export async function cancelAppointment(id) {
  return await request("/appointment/cancel/" + id, {}, HttpMethod.DELETE);
}

export async function deleteSlot(id) {
  return await request("/appointment-slot/" + id, {}, HttpMethod.DELETE);
}

export async function searchFreeSlots(dto) {
  console.log(dto);
  return await request(
    "/appointment-slot/available-slots" + makeParametersList(dto)
  );
}
export async function createSlot(dto) {
  return await request("appointment-slot/", dto, HttpMethod.POST);
}

export async function getPage(page, size = 2, sort = "") {
  let dto = {
    page: page,
    size: size,
    sort: sort,
  };
  return await request("/appointment-slot/page" + makeParametersList(dto));
}

export async function generateQR() {
  return await request("appointment/generate-qr",5, HttpMethod.POST);
}
