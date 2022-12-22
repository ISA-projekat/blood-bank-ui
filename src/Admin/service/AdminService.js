import {request} from '../../components/base/HTTP'


export async function getAvailableAdmins() {
    return await request(`http://localhost:8080/user/availableAdministrators`);
  }


  export async function getBloodBankId(id) {
    return await request(`http://localhost:8080/bloodbank/by-admin/`+id);
  }