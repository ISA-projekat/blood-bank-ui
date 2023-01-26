import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getById } from "../../../services/user/UserService";
import AuthContext from "../../../store/bloodbank/login/login-context";

const BloodBankAdminNavbar = (props) => {
  const context = useContext(AuthContext);
  const [bloodBankId, setBloodBankId] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getById(context.user.id);
    console.log(response.data);
    setBloodBankId(response.data.bloodBankId);
  };

  const getLink = () => {
    return "/blood-bank-details/" + bloodBankId;
  };

  const getAppSlotsLink = () => {
    return "/blood-bank/appointments/" + bloodBankId;
  };

  const getAppHistoryLink = () => {
    return "/admin/calendar";
  };

  const getUsersLink = () => {
    return "/admin/users";
  };

  const getMapLink = () => {
    return "/admin/map";
  };

  const getProfileLink = () => {
    return "/user/" + context.user.id;
  };

  const getDonatorsLink = () => {
    return "/admin/donators/" + bloodBankId;
  };

  return (
    <React.Fragment>
      <div className="landing-navbar__item">
        <NavLink to={getMapLink()} className={"navlink"}>
          Deliveries
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to={getAppHistoryLink()} className={"navlink"}>
          Appointment history
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to={getUsersLink()} className={"navlink"}>
          Users
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to={getDonatorsLink()} className={"navlink"}>
          Donators
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to={getLink()} className={"navlink"}>
          My blood bank
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to={getProfileLink()} className={"navlink"}>
          My profile
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <button
          className="button bg-orange"
          style={{ marginTop: "0rem", padding: "1rem 1.5rem" }}
          onClick={props.handleLogout}
        >
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default BloodBankAdminNavbar;
