import "../Admin/RegisterAdministrator.scss";
import { useState } from "react";
import AdminRegistrationForm from "./Form/AdminRegistrationForm";

const RegisterAdministrator = () => {
  return (
    <div className="registration">
      <div className="registration__header">
        <h1> Become a blood donor </h1>
      </div>
      <div className="registration__form">
        <AdminRegistrationForm />
      </div>
    </div>
  );
};

export default RegisterAdministrator;
