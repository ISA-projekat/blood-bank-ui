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
import AdminMainPage from "./pages/AdminPage/AdminMainPage";
import AddAdminToBloodBank from "./Admin/AddAdminToBloodBank";
import RegisterAdministrator from "./Admin/RegisterAdministrator";
import RegistrationPage from "./pages/registration/RegistrationPage";
import { ToastContainer, toast } from "react-toastify";
import BloodBankComponent from "./components/bloodBankComponent";
import BloodBanksPage from "./pages/BloodBanksPage/BloodBanksPage";
import SurveyPage from "./pages/survey-page/SurveyPage";
import AdminUsersView from "./Admin/AdminUsersView/AdminUsersView";

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
        <Route path="/admin" element={<AdminMainPage/>} />
        <Route path="/admin/addToBloodBank" element={<AddAdminToBloodBank/>} />
        <Route path="/admin/register" element={<RegisterAdministrator/>} />
        <Route path="/admin/users" element={<AdminUsersView/>} />
        <Route
          path="/error/internal-server-error"
          element={<InternalServerErrorPage />}
        />
        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />
        <Route path="/blood-banks" element={<BloodBanksPage />} />
        <Route path="/survey" element={<SurveyPage />} />
      </Routes>
    </div>
  );
}

export default App;
