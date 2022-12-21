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
import RegistrationSuccess from "./pages/registration/RegistrationSuccess";
import { ToastContainer, toast } from "react-toastify";
import BloodBankComponent from "./components/bloodBankComponent";
import BloodBanksPage from "./pages/BloodBanksPage/BloodBanksPage";
import SurveyPage from "./pages/survey-page/SurveyPage";
import AdminUsersView from "./Admin/AdminUsersView/AdminUsersView";
import AuthContext from "./store/bloodbank/login/login-context";
import ActivationPage from "./pages/activation-page/ActivationPage";
import React, { useContext } from "react";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import userEvent from "@testing-library/user-event";

function App() {
  const context = useContext(AuthContext);
  console.log(context.isLoggedIn);
  console.log(context.user);

  const getUnregisteredRoutes = () => {
    return (
      <React.Fragment>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/activate/:email" element={<ActivationPage />} />
      </React.Fragment>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/error/not-found" index element={<NotFoundPage />} />
        <Route path="/error/bad-request" index element={<BadRequestPage />} />
        <Route path="/blood-banks" element={<BloodBanksPage />} />
        <Route
          path="/error/internal-server-error"
          element={<InternalServerErrorPage />}
        />
        <Route
          path="/error/unauthorized"
          index
          element={<UnauthorizedPage />}
        />
        <Route path="/error/forbidden" index element={<ForbiddenPage />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={!context.isLoggedIn}
              redirectPath={"/"}
            />
          }
        >
          {getUnregisteredRoutes()}
        </Route>
        <Route element={<ProtectedRoute isAllowed={context.isLoggedIn} />}>
          <Route path="/user/:id" element={<ProfilePage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={
                context.isLoggedIn && context.user.role === "ROLE_SYS_ADMIN"
              }
              redirectPath={"/"}
            />
          }
        >
          <Route path="/admin" element={<AdminMainPage />} />
          <Route
            path="/admin/addToBloodBank"
            element={<AddAdminToBloodBank />}
          />
          <Route path="/admin/register" element={<RegisterAdministrator />} />
          <Route path="/admin/users" element={<AdminUsersView />} />
        </Route>

        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />

        <Route
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                context.isLoggedIn && context.user.role === "ROLE_REGISTERED"
              }
            />
          }
        >
          <Route path="/survey" element={<SurveyPage />} />
        </Route>
        <Route path="*" exact={true} component={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
