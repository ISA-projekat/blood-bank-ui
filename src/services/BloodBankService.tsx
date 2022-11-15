import { BloodBank } from "../store/bloodbank/details/Types";
import client from "./client";

export const getBloodBank = async (id: number) =>
  client.get(`/bloodbank/${id}`);

export const updateBloodBank = async (bloodBank: BloodBank) =>
  client.put("/bloodbank", bloodBank);
