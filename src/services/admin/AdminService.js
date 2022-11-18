import { request } from "../../components/base/HTTP";
import HttpMethod from "../../constants/HttpMethod";


export async function createBloodBank(dto){
    return await request("/bloodbank/create", dto, HttpMethod.POST);
}

export async function addAdminToBloodBank(dto){
    return await request("/bloodbank/setAdministrator",dto, HttpMethod.POST);
}