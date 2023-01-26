import HttpMethod from "../../constants/HttpMethod";
import { request } from "../../components/base/HTTP";

export async function startDelivery(newDeliveryDto) {
  return await request("/delivery/start", newDeliveryDto, HttpMethod.POST);
}
