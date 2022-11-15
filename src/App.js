import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import { routes } from "./constants/routes";
import BloodBankDetailsPage from "./pages/BloodBankDetailsPage/BloodBankDetailsPage";
import "./App.css";
import LoginPage from "./pages/login-page/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
