import { request } from "../../components/base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getAllUsers() {
  return await request("/user/");
}

export async function getById(id) {
  return await request("/user/" + id);
}

export async function registerUser(dto) {
  return await request("/user/register", dto, HttpMethod.POST);
}
