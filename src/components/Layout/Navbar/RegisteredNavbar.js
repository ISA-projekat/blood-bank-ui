import React from "react";
import { NavLink } from "react-router-dom";

const RegisteredNavbar = (props) => {
  return (
    <React.Fragment>
      <div className="landing-navbar__item">
        <NavLink to="/my-calendar" className={"navlink"}>
          My calendar
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/blood-banks" className={"navlink"}>
          Find a donor center
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/survey" className={"navlink"}>
          My survey
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/profile" className={"navlink"}>
          My profile
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <button
          className="orange-button"
          style={{ marginTop: "0rem", padding: "0.5rem 1rem" }}
          onClick={props.handleLogout}
        >
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default RegisteredNavbar;
