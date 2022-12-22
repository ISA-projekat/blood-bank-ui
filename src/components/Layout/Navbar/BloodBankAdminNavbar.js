import React from "react";
import { NavLink } from "react-router-dom";

const BloodBankAdminNavbar = (props) => {
  return (
    <React.Fragment>
      <div className="landing-navbar__item">
        <NavLink to="/blood-banks" className={"navlink"}>
          Find a donor center
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

export default BloodBankAdminNavbar;
