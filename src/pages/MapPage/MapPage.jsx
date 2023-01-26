import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';

import PageLayout from '../../components/Layout/MainLayout/PageLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import './Map.scss';

import icon from '../../assets/img/delivery.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconbb from '../../assets/img/bbank2.png';
import hospitalicon from '../../assets/img/hospitaldel1.png';
import L from 'leaflet';

import { Autocomplete, TextField } from '@mui/material';

import { toast } from "react-toastify";
import { startDelivery } from '../../services/blood-bank/DeliveryService';

let DefaultIcon = L.icon({
    iconUrl: icon,
});

let IconBb = L.icon({
  iconUrl: iconbb
})

let HospitalBb = L.icon({
  iconUrl: hospitalicon
})

L.Marker.prototype.options.icon = DefaultIcon;

const position = [45.240330, 19.797357];
const SOCKET_URL = 'http://localhost:8080/socket';
const partners = [
  {
    label: 'Care Connect',
    value: [45.239908, 19.822748]
  },
  {
    label: 'Hospital Hub',
    value: [45.244573, 19.794183]
  },
  {
    label: 'General Hospital',
    value: [45.247815, 19.810340]
  }
]

const frequency = [
  {
    label: 'Every second',
    value: 1
  },
  {
    label: 'Every 5 seconds',
    value: 5
  },
  {
    label: 'Every 10 seconds',
    value: 10,
  },
  {
    label: 'Every 30 seconds',
    value: 30
  }
]

const MapPage = () => {

    const [message, setMessage] = useState([19.796963, 45.240372]);
    const [finish, setFinish] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(partners[0]);
    const [selectedFrequency, setSelectedFrequency] = useState(frequency[0]);
    const [trigger, setTrigger] = useState(0);
    const [inputValue, setInputValue] =  useState("")
    const [inputValueFrq, setInputValueFrq] = useState("")
    const [clicked, setClicked] = useState([]);

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onDisconected = () => {
      toast.success("Delivery is on location", {
      position: toast.POSITION.TOP_CENTER,
    });
    }

    let onMessageReceived = (msg) => {
        console.log(msg)
        let splitmsg = msg.split(',');
        console.log(splitmsg);
        setMessage([parseFloat(splitmsg[1]), parseFloat(splitmsg[0])]);
    }

    const renderMarker = () => {
        return <Marker position={message}></Marker>
    }

    const handleClick = (e) => {
        setClicked(e.latlng)
        console.log(e.latlng);
    }

    const handleStart = async () => {
      if (!selectedPartner || selectedPartner.value.length === 0) {
        toast.warning("Please specify delivery location", {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
      if (!selectedFrequency || selectedFrequency.value === 0) {
        toast.warning("Please specify frequency", {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      let dto = { startLocation: [position[1], position[0]], endLocation: [selectedPartner.value[1], selectedPartner.value[0]], frequency: selectedFrequency.value}

      const res = await startDelivery(dto)
      if (!res || !res.ok) {
        toast.error("Something went wrong with delivery. Please try again!", { position: toast.POSITION.TOP_CENTER })
      }

      setFinish(selectedPartner.value);
    }

 return (
 <PageLayout class={'map-container'}>
  <div className={'map-container__map'}>
    <div id="map" className='map'>
  <MapContainer center={position} zoom={15} scrollWheelZoom={true} onClick={handleClick}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[45.240372, 19.796963]} icon={IconBb} />
    {finish.length !== 0 && <Marker position={finish} icon={HospitalBb}/>}
    {renderMarker()}
  </MapContainer>
</div>
<div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/socket-publisher']}
        onConnect={onConnected}
        onDisconnect={onDisconected}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{clicked}</div>
    </div>
    </div>
    <div className={'map-container__form'}>
      <div className={'delivery'}>
        <div className={'delivery__header'}>
          Start a new delivery
        </div>
        <div className={'delivery__body'}>
          <div className='delivery__body-autocomplete'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={partners}
            renderInput={(params) => <TextField {...params} label="Partners"/>}
            value = {selectedPartner}
            onChange={(event, newValue) => {
              setSelectedPartner(newValue);
              console.log(selectedPartner);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          </div>
          <div className='delivery__body-autocomplete'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={frequency}
            value={selectedFrequency}
            onChange={(event, newValue) => {
              setSelectedFrequency(newValue)
            }}
            inputValue={inputValueFrq}
            onInputChange={(event, newInputValue) => {
              setInputValueFrq(newInputValue)
            }}
            renderInput={(params) => <TextField {...params} label="Response time"/>}      
          />
          </div>
          <div className={'delivery__body-button'}>
            <button className='button-small' onClick={handleStart}>Start</button>
          </div>
        </div>
      </div>
    </div>
 </PageLayout>
 )

}

export default MapPage;