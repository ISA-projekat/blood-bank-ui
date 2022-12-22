import client from "./client";

export const getAllowUser = async (id: number) =>
  client.get(`/survey/allow-user/${id}`);
