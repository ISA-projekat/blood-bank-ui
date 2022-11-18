import { request } from "./../../components/base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function addSurvey(dto) {
  return await request("/survey", dto, HttpMethod.POST);
}
