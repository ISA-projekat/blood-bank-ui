import { AppointmentReviewDto } from "../store/appointment/Types";
import client from "./client";

export const reviewAppointment = async (
  appoinmentReviewDto: AppointmentReviewDto
) => client.post("/appointment/review", appoinmentReviewDto);

export const getAllByUser = async (userId: number) =>
  client.get(`/appointment/user/${userId}`);
