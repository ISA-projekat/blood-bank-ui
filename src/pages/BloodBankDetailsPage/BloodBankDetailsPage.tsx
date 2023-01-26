import { useParams } from "react-router";
import BloodBankDetails from "../../components/BloodBankDetails";
import PageLayout from "../../components/Layout/MainLayout/PageLayout";
import BloodBankDetailsContextProvider from "../../store/bloodbank/details/BloodBankDetailsContext";

const BloodBankDetailsPage = () => {
  const { id } = useParams();

  return (
    <BloodBankDetailsContextProvider id={parseInt(id || "0", 10)}>
      <PageLayout>
        <BloodBankDetails />
      </PageLayout>
    </BloodBankDetailsContextProvider>
  );
};

export default BloodBankDetailsPage;
