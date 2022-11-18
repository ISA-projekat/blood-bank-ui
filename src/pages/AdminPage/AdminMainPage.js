import '../AdminPage/AdminStyles.scss';
import { startTransition, useState } from 'react';
import { createBloodBank } from '../../services/admin/AdminService';

const AdminMainPage = () => {
    
    
   
    const [name, setName] = useState("");
    const [description,setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] =useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [city,setCity] = useState("");
    const [country,setCountry] = useState("");
    
    async function submit() {

      let dto = {name: name,description:description,startTime:startTime,endTime:endTime,street:street,number:number,city:city,country:country};
      const reponse = await createBloodBank(dto);
    }
    
    function nameChanged(event) {
        setName(event.target.value);
    }

    function descriptionChanged(event){
        setDescription(event.target.value);
    }

    function startTimeChanged(event){
        setStartTime(event.target.value);
    }
    
    function endTimeChanged(event){
        setEndTime(event.target.value);
    }

    function streetChanged(event){
        setStreet(event.target.value);
    }
    
    function numberChanged(event){
        setNumber(event.target.value);
    }

    function cityChanged(event){
        setCity(event.target.value);
    }

    function countryChanged(event){
        setCountry(event.target.value);
    }


    return ( 
        
        <div className="outterMain" >
            <div className="main">
                <div className='single'>
                    <label className='label1'>Name</label>
                    <input type="text" className='input1' value={name} onChange={nameChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>Description</label>
                    <input type="text" className='input1' value={description} onChange={descriptionChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>Start Time</label>
                    <input type="text" className='input1' value={startTime} onChange={startTimeChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>End time</label>
                    <input type="text" className='input1' value={endTime} onChange={endTimeChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>Street</label>
                    <input type="text" className='input1' value={street} onChange={streetChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>Number</label>
                    <input type="text" className='input1' value={number} onChange={numberChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>City</label>
                    <input type="text" className='input1' value={city} onChange={cityChanged}/>
                </div>
                <div className='single'>
                    <label className='label1'>Country</label>
                    <input type="text" className='input1' value={country} onChange={countryChanged}/>
                </div>
                
                <div className='buttonOutter'>

                    <button className='button1' onClick={submit}>Confirm</button>
            
                </div>
                   
            </div>

        </div>
        
     );
}
 
export default AdminMainPage;