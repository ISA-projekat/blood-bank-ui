import React from "react";
import { NavLink } from "react-router-dom";

const SysAdminNavbar = (props) => {
  return (
    <React.Fragment>
      <div className="landing-navbar__item">
        <NavLink to="/blood-banks" className={"navlink"}>
          Find a donor center
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/admin/users" className={"navlink"}>
          Users
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/admin/register" className={"navlink"}>
          Register new admin
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <NavLink to="/admin/addToBloodBank" className={"navlink"}>
          Update blood bank admin
        </NavLink>
      </div>
      <div className="landing-navbar__item">
        <button
          className="button bg-orange"
          style={{ marginTop: "0rem", padding: "0.5rem 1rem" }}
          onClick={props.handleLogout}
        >
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default SysAdminNavbar;
