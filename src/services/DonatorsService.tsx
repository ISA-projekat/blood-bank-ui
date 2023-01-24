import client from "./client";

export const getDonators = async (bloodBankId: number) =>
  client.get(`/user/donators/${bloodBankId}`);
