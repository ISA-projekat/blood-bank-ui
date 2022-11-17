import HttpMethod from "../../constants/HttpMethod";
import { makeParametersList, request } from "../../components/base/HTTP";

export async function getBloodBanks() {
  return await request("/bloodbank/");
}

export async function search(dto) {
  return await request("/bloodbank/search" + makeParametersList(dto));
}
