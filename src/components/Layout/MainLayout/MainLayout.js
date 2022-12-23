import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../../../store/bloodbank/login/login-context";
import BloodBankAdminNavbar from "../Navbar/BloodBankAdminNavbar";
import RegisteredNavbar from "../Navbar/RegisteredNavbar";
import SysAdminNavbar from "../Navbar/SysAdminNavbar";
import UnregisterdNavbar from "../Navbar/UnregisteredNavbar";

const MainLayout = (props) => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    context.logout();
    toast.success("You have been logged out!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/");
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const navigateTo = () => {
    navigate("/");
  };

  return (
    <div className="pages-wrapper">
      <div className="nav-wrapper">
        <div className="home" onClick={navigateTo}>
          <div className="home__image"></div>
          <div className="home__text">Blood Bank Central</div>
        </div>
        <div className="landing-navbar">
          {!context.isLoggedIn && isCurrentPath("/") && <UnregisterdNavbar />}
          {context.user.role === "ROLE_SYS_ADMIN" && (
            <SysAdminNavbar handleLogout={logout} />
          )}
          {context.user.role === "ROLE_REGISTERED" && (
            <RegisteredNavbar handleLogout={logout} />
          )}
          {context.user.role === "ROLE_BLOOD_BANK_ADMIN" && (
            <BloodBankAdminNavbar handleLogout={logout} />
          )}
        </div>
      </div>
      <div className="main-content">{props.children}</div>
    </div>
  );
};

export default MainLayout;
