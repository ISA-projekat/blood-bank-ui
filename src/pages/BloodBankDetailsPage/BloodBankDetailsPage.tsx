import { useParams } from "react-router";
import BloodBankDetails from "../../components/BloodBankDetails";
import BloodBankDetailsContextProvider from "../../store/bloodbank/details/BloodBankDetailsContext";

const BloodBankDetailsPage = () => {
  const { id } = useParams();

  return (
    <BloodBankDetailsContextProvider id={parseInt(id || "0", 10)}>
      <BloodBankDetails />
    </BloodBankDetailsContextProvider>
  );
};

export default BloodBankDetailsPage;
