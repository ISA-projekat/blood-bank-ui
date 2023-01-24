import React from 'react'
import PageLayout from '../../components/Layout/MainLayout/PageLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import './Map.scss';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [45.240330, 19.797357];
const positions = [
                    [
                        19.79696,
                        45.240356
                    ],
                    [
                        19.798718,
                        45.240199
                    ],
                    [
                        19.798878,
                        45.240938
                    ],
                    [
                        19.798886,
                        45.240978
                    ],
                    [
                        19.800668,
                        45.240811
                    ],
                    [
                        19.800825,
                        45.241556
                    ],
                    [
                        19.800829,
                        45.241581
                    ],
                    [
                        19.800844,
                        45.241669
                    ],
                    [
                        19.801025,
                        45.241651
                    ],
                    [
                        19.802512,
                        45.241509
                    ],
                    [
                        19.80271,
                        45.24149
                    ],
                    [
                        19.802755,
                        45.241486
                    ],
                    [
                        19.802865,
                        45.241476
                    ],
                    [
                        19.802913,
                        45.241471
                    ],
                    [
                        19.803069,
                        45.241456
                    ],
                    [
                        19.803177,
                        45.241446
                    ],
                    [
                        19.80398,
                        45.241367
                    ],
                    [
                        19.806873,
                        45.241083
                    ],
                    [
                        19.806913,
                        45.241079
                    ],
                    [
                        19.807123,
                        45.241057
                    ],
                    [
                        19.807329,
                        45.241037
                    ],
                    [
                        19.809057,
                        45.240867
                    ],
                    [
                        19.80922,
                        45.240849
                    ],
                    [
                        19.811002,
                        45.240675
                    ],
                    [
                        19.811131,
                        45.240663
                    ],
                    [
                        19.81129,
                        45.240647
                    ],
                    [
                        19.811413,
                        45.240635
                    ],
                    [
                        19.811583,
                        45.240618
                    ],
                    [
                        19.811634,
                        45.240613
                    ],
                    [
                        19.812102,
                        45.240567
                    ],
                    [
                        19.813165,
                        45.240462
                    ],
                    [
                        19.813214,
                        45.240457
                    ],
                    [
                        19.813375,
                        45.240442
                    ],
                    [
                        19.816036,
                        45.240179
                    ],
                    [
                        19.816241,
                        45.240159
                    ],
                    [
                        19.816454,
                        45.240139
                    ],
                    [
                        19.819736,
                        45.239818
                    ],
                    [
                        19.819926,
                        45.2398
                    ],
                    [
                        19.820435,
                        45.23975
                    ],
                    [
                        19.82073,
                        45.239721
                    ],
                    [
                        19.821022,
                        45.239693
                    ],
                    [
                        19.82224,
                        45.239574
                    ],
                    [
                        19.822303,
                        45.239562
                    ],
                    [
                        19.822384,
                        45.239546
                    ],
                    [
                        19.822507,
                        45.239522
                    ],
                    [
                        19.822518,
                        45.239503
                    ],
                    [
                        19.822531,
                        45.239486
                    ],
                    [
                        19.822559,
                        45.239459
                    ],
                    [
                        19.822676,
                        45.239405
                    ],
                    [
                        19.822816,
                        45.239401
                    ],
                    [
                        19.822861,
                        45.239411
                    ],
                    [
                        19.822901,
                        45.239426
                    ],
                    [
                        19.823025,
                        45.239471
                    ],
                    [
                        19.823195,
                        45.239495
                    ],
                    [
                        19.823306,
                        45.239504
                    ],
                    [
                        19.823508,
                        45.239516
                    ],
                    [
                        19.823923,
                        45.239541
                    ],
                    [
                        19.824179,
                        45.239569
                    ],
                    [
                        19.82435,
                        45.239596
                    ],
                    [
                        19.825253,
                        45.239804
                    ],
                    [
                        19.82529,
                        45.239813
                    ],
                    [
                        19.825429,
                        45.239848
                    ],
                    [
                        19.825421,
                        45.239939
                    ],
                    [
                        19.825289,
                        45.239907
                    ],
                    [
                        19.825146,
                        45.239873
                    ],
                    [
                        19.824603,
                        45.239743
                    ],
                    [
                        19.824104,
                        45.239665
                    ],
                    [
                        19.823845,
                        45.239655
                    ],
                    [
                        19.823485,
                        45.239665
                    ],
                    [
                        19.823341,
                        45.239685
                    ],
                    [
                        19.823146,
                        45.239735
                    ],
                    [
                        19.822975,
                        45.2398
                    ],
                    [
                        19.822834,
                        45.239874
                    ],
                    [
                        19.822768,
                        45.239922
                    ]
                ]

const MapPage = () => {

    const timer = ms => new Promise(res => setTimeout(res, ms))

    const generateRoute = () => {
        let result = [];

        for (let point of positions) {
            result.push(<Marker position={[point[1], point[0]]}></Marker>)
        }

        return result;
    }

 return (
 <PageLayout class={'map-container'}>
    <div id="map" className='map'>
  <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {generateRoute()}
  </MapContainer>
</div>
 </PageLayout>
 )

}

export default MapPage;