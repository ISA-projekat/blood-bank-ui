import React from "react";
import { NavLink } from "react-router-dom";

const UnregisterdNavbar = () => {
  return (
    <React.Fragment>
      <div className="landing-navbar__item">
        <NavLink to="/blood-banks" className={"navlink"}>
          Find a donor center
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/login" className={"navlink"}>
          Already a donor?
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default UnregisterdNavbar;
