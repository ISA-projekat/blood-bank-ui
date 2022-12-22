import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import { routes } from "./constants/routes";
import BloodBankDetailsPage from "./pages/BloodBankDetailsPage/BloodBankDetailsPage";
import AppointmentProcessingPage from "./pages/AppointmentProcessingPage/AppointmentProcessingPage";
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
import MainLayout from "./components/Layout/MainLayout/MainLayout";
import NewAppointmentSlotPage from "./pages/Appointments/NewAppointmentSlotPage/NewAppointmentSlotPage";
import BloodBankSlots from "./pages/Appointments/BloodBankSlots/BloodBankSlots";
import UsersAppointments from "./pages/UsersAppointments/UsersAppointments";

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

  const getSysAdminRoutes = () => {
    return (
      <React.Fragment>
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/admin/addToBloodBank" element={<AddAdminToBloodBank />} />
        <Route path="/admin/register" element={<RegisterAdministrator />} />
      </React.Fragment>
    );
  };

  const getAllPermittedRoutes = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  const getAllBloodBankRoutes = () => {
    return (
      <React.Fragment>
        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />
        <Route path={"/schedule-slots"} element={<NewAppointmentSlotPage />} />
        <Route
          path={routes.APPOINTMENT_PROCESSING}
          element={<AppointmentProcessingPage />}
        />
        <Route
          path={routes.USERS_APPOINMENTS}
          element={<UsersAppointments />}
        />
        <Route
          path={routes.BLOOD_BANK_DETAILS}
          element={<BloodBankDetailsPage />}
        />
      </React.Fragment>
    );
  };

  const getAllAuthenticatedRoutes = () => {
    return (
      <React.Fragment>
        <Route
          path={"/blood-bank/appointments/:id"}
          element={<BloodBankSlots />}
        />
      </React.Fragment>
    );
  };

  return (
    <MainLayout>
      <Routes>
        {getAllPermittedRoutes()}
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
          {getSysAdminRoutes()}
        </Route>
        <Route
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                context.isLoggedIn &&
                (context.user.role === "ROLE_BLOOD_BANK_ADMIN" ||
                  context.user.role === "ROLE_SYS_ADMIN")
              }
            />
          }
        >
          <Route path="/admin/users" element={<AdminUsersView />} />
        </Route>
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

        <Route
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                context.isLoggedIn &&
                context.user.role === "ROLE_BLOOD_BANK_ADMIN"
              }
            />
          }
        >
          {getAllBloodBankRoutes()}
        </Route>

        <Route
          element={
            <ProtectedRoute redirectPath="/" isAllowed={context.isLoggedIn} />
          }
        >
          {getAllAuthenticatedRoutes()}
        </Route>
        <Route path="*" exact={true} component={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
