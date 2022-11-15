import { useFormik } from "formik";
import { idText } from "typescript";
import { useBookDetailsContext } from "../../store/bloodbank/details/BloodBankDetailsContext";
import "./BloodBankDetails.css";

const BloodBankDetails = () => {
  const { bloodBank, updateBloodBank } = useBookDetailsContext();

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
    },
    onSubmit: (values) => {
      updateBloodBank?.({ ...values, address: { ...values } });
      console.log(values);
    },
    enableReinitialize: true,
  });

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
    </div>
  );
};

export default BloodBankDetails;
