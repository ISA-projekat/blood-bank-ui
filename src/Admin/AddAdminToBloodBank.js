import '../Admin/AddAdminToBloodBank.scss';
import { useEffect, useState } from 'react';
import { addAdminToBloodBank } from '../services/admin/AdminService';
import {NavLink} from 'react-router-dom';
import { getAvailableAdmins } from './service/AdminService';
import { useNavigate } from "react-router-dom";

const AddAdminToBloodBank = () => {
    
    const navigate = useNavigate();
    const [administrators,setAdministrators] = useState([""]);
    const [adminId, setAdminId] = useState();
    const [bloodBankId,setBloodBankId] = useState();

    useEffect(() => {
        
        fetchData();
    }, [])


    const fetchData = async () => {
            
        const response = await getAvailableAdmins();
        
        setAdministrators(response.data);
        
    };

    //function confirm(){
    //    console.log(patientId);}

    function changeAdmin(newAdmin){
        setAdminId(newAdmin);
    }
    
    function changeBloodBankId(id){
        setBloodBankId(id);
    }

    async function confirm() {
        const admId = parseInt(adminId);
        let dto = {bloodBankId:bloodBankId,administratorId:admId};
        const reponse = await addAdminToBloodBank(dto);
        console.log(dto)
        navigate("/");
      }

    
    return ( 
       <div>
            <div className='register'>
                <NavLink to='/admin/register'><button>Register new administrator</button></NavLink>
            </div>
        <div className='outterDiv'>
            
            <div className='bank'>
                <label>Blood Bank id</label>
                <input value={bloodBankId} onChange={(event) => changeBloodBankId(event.target.value)}/>
            </div>
            <div>
                <label className='bank'>Admins</label>
                <select onChange={(event) => changeAdmin(event.target.value)}
                    value={adminId}>
                        {administrators.map((administrator) => (
                            <option value={administrator.id} key={administrator.id}>
                                {administrator.firstName + " " + administrator.lastName}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <button onClick={confirm}>Confirm</button>
            </div>
      </div>
    </div>
  );
};

export default AddAdminToBloodBank;
