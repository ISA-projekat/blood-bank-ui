import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
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
    navigate("/");
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="pages-wrapper">
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
      <div className="main-content">{props.children}</div>
    </div>
  );
};

export default MainLayout;
