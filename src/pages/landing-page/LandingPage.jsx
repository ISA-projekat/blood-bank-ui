import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <div className="landing-navbar">
        <div className="landing-navbar__item">Find a donor center</div>
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
            <button className="landing-main__header-button-style">
              <NavLink to='/login' className={'navlink'}>I want to donate</NavLink>
            </button>
          </div>
        </div>
        <div className="landing-main__image"></div>
      </div>
    </div>
  );
}
