import { useFormik } from "formik";
import { idText } from "typescript";
import { useBookDetailsContext } from "../../store/bloodbank/details/BloodBankDetailsContext";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./BloodBankDetails.css";
import { useEffect, useState } from "react";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

L.Marker.prototype.options.icon = DefaultIcon;

const BloodBankDetails = () => {
  const { bloodBank, updateBloodBank } = useBookDetailsContext();
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      id: bloodBank?.id || "",
      name: bloodBank?.name || "",
      description: bloodBank?.description || "",
      rating: bloodBank?.rating || 0,
      country: bloodBank?.address.country || "",
      city: bloodBank?.address.city || "",
      street: bloodBank?.address.street || "",
      number: bloodBank?.address.number || "",
      longitude: bloodBank?.address.longitude || "",
      latitude: bloodBank?.address.latitude || "",
    },
    onSubmit: (values) => {
      updateBloodBank?.({ ...values, address: { ...values } });
      console.log(values);
    },
    enableReinitialize: true,
  });

  const longitude = Number(formik.values.longitude || "");
  const latitude = Number(formik.values.latitude || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshKey(refreshKey + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="blood-bank-details-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <label htmlFor="rating">Rating: </label>
        <input
          id="rating"
          name="rating"
          type="text"
          disabled
          value={formik.values.rating}
        />
        <label htmlFor="country">Country: </label>
        <input
          id="country"
          name="country"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <label htmlFor="city">City: </label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        <label htmlFor="street">Street: </label>
        <input
          id="street"
          name="street"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.street}
        />
        <label htmlFor="number">Number: </label>
        <input
          id="number"
          name="number"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.number}
        />
        Administrators:
        <ul>
          {bloodBank?.administrators.map((a) => {
            return (
              <li>
                {a.firstName} {a.lastName}
              </li>
            );
          })}
        </ul>
        <div className="button-div">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="map-div">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={false}
          key={refreshKey}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {formik.values.street} {formik.values.number},{" "}
              {formik.values.city},{formik.values.country}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BloodBankDetails;
