import {request} from '../../components/base/HTTP';


export async function getByBloodBank(id) {
    let url = "appointment/by-blood-bank/"+id;
    return await request(url);
  }
  