import { makeParametersList, request } from "../../components/base/HTTP";
import HttpMethod from "../../constants/HttpMethod";


export async function createBloodBank(dto){
    return await request("/bloodbank/create", dto, HttpMethod.POST);
}

export async function addAdminToBloodBank(dto){
    return await request("/bloodbank/setAdministrator",dto, HttpMethod.POST);
}

export async function registerAdministrator(dto){
    return await request("/user/registerAdmin",dto, HttpMethod.POST);
}

export async function adminSearch(dto){
    return await request("user/search" + makeParametersList(dto));
}

export async function changeAdminPassword(dto){
    return await request("user/admin/change-password" ,dto, HttpMethod.POST);
}