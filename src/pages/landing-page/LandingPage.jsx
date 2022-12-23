import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/bloodbank/login/login-context";
import "./LandingPage.scss";
import { useEffect } from "react";
import { CheckIfFirstLoginCompleted } from "../../Admin/service/AdminService";
import { useNavigate } from "react-router";


export default function LandingPage() {

  const context = useContext(AuthContext)
  const navigate = useNavigate();
  

  useEffect(() => {
    if (context.isLoggedIn){
      fetchData();
    }
    
  }, [])


  const fetchData = async () => {
    
    
    const response = await CheckIfFirstLoginCompleted(context.user.sub);
    
    if(response.data == false){
      navigate("/admin/redirect")
    }
    
  };


  return (
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
          {!context.isLoggedIn && <div className="landing-main__header-button">
            <NavLink to='/register' className={'navlink'}>
            <button className="landing-main__header-button-style">
              I want to donate
            </button>
            </NavLink>
          </div>}
          {context.user.role === 'ROLE_REGISTERED' && <div className="landing-main__header-button">
            <NavLink to='/appointments/search' className={'navlink'}>
            <button className="landing-main__header-button-style">
              Schedule a donation
            </button>
            </NavLink>
          </div>}
        </div>
        <div className="landing-main__image"></div>
      </div>
  );
}
