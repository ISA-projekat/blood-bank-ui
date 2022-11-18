import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <div className="landing-navbar">
        <div className="landing-navbar__item"><NavLink to='/blood-banks' className={'navlink'}>Find a donor center</NavLink></div>
        <div className="landing-navbar__item"><NavLink to='/login' className={'navlink'}>Already a donor?</NavLink></div>
      </div>
      <div className="landing-main">
        <div className="landing-main__header">
          <div className="landing-main__header-text">
            Let it Bleed. <br />
            That's all we need.
          </div>
          <div className="landing-main__header-description">
            <p>Join world's biggest blood bank community.</p>
            <p>Schedule your donation.</p>
            <p>Save a life.</p>
          </div>
          <div className="landing-main__header-button">
            <NavLink to='/register' className={'navlink'}>
            <button className="landing-main__header-button-style">
              I want to donate
            </button>
            </NavLink>
          </div>
        </div>
        <div className="landing-main__image"></div>
      </div>
    </div>
  );
}
