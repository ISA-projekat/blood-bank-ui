import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import { routes } from "./constants/routes";
import BloodBankDetailsPage from "./pages/BloodBankDetailsPage/BloodBankDetailsPage";
import "./App.css";
import LoginPage from "./pages/login-page/LoginPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/error/NotFoundPage";
import BadRequestPage from "./pages/error/BadRequestPage";
import UnauthorizedPage from "./pages/error/UnauthorizedPage";
import ForbiddenPage from "./pages/error/ForbiddenPage";
import InternalServerErrorPage from "./pages/error/InternalServerErrorPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/error/not-found" element={<NotFoundPage />} />
        <Route path="/error/bad-request" element={<BadRequestPage />} />
        <Route path="/error/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/error/forbidden" element={<ForbiddenPage />} />
        <Route
          path="/error/internal-server-error"
          element={<InternalServerErrorPage />}
        />
        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
