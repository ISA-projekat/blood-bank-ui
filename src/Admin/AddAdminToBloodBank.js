import '../Admin/AddAdminToBloodBank.scss';
import { useEffect, useState } from 'react';
import { addAdminToBloodBank } from '../services/admin/AdminService';
import {NavLink} from 'react-router-dom';

const AddAdminToBloodBank = () => {
    
    
    const [administrators,setAdministrators] = useState([""]);
    const [adminId, setAdminId] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/user/availableAdministrators`)
        .then(res => res.json())
        .then(data => {
            setAdministrators(data)
        })
    }, [])

    //function confirm(){
    //    console.log(patientId);}

    function changeAdmin(newAdmin){
        setAdminId(newAdmin);
    }

    async function confirm() {
        const admId = parseInt(adminId);
        let dto = {bloodBankId:1,administratorId:admId};
        const reponse = await addAdminToBloodBank(dto);
        
      }

    
    return ( 
       <div>
            <div className='register'>
                <NavLink to='/admin/register'><button>Register new administrator</button></NavLink>
            </div>
        <div className='outterDiv'>
            
            <div className='bank'>
                <label>Blood Bank id</label>
                <input value="1" disabled="true" className='input3'/>
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
}
 
export default AddAdminToBloodBank;

