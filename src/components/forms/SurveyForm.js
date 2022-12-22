import React, { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { addSurvey } from "../../services/survey/surveyService";
import { useNavigate } from "react-router";
import AuthContext from "../../store/bloodbank/login/login-context";

const SurveyForm = () => {
  const form = useForm();
  const { register, handleSubmit } = form;
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const onSubmit = async (val) => {
    console.log(val);
    const dto = { ...val, userId: context.user.id };
    const response = await addSurvey(dto);
    if (!response || !response.ok) {
      alert("Error in creating survey");
      return;
    }

    alert("Survey successfully created");
    navigate("/");
  };

  return (
    <div>
      <FormProvider {...form}>
        <div className="radio-group">
          <label className="label">
            Do you have problems related to blood pressure?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("bloodPressureProblems", { required: true })}
              value="true"
            />
            <label for="bloodPressureProblems" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("bloodPressureProblems", { required: true })}
              value="false"
            />
            <label for="bloodPressureProblems">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">Do you weigh less than 50 kg?</label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("weightOver50kg", { required: true })}
              value="true"
            />
            <label for="weightOver50kg" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("weightOver50kg", { required: true })}
              value="false"
            />
            <label for="weightOver50kg">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">
            Did you have common cold in the past 6 months?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("commonCold", { required: true })}
              value="true"
            />
            <label for="commonCold" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("commonCold", { required: true })}
              value="false"
            />
            <label for="commonCold">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">Are you on menstrual cycle?</label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("menstrualCycle", { required: true })}
              value="true"
            />
            <label for="menstrualCycle" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("menstrualCycle", { required: true })}
              value="false"
            />
            <label for="menstrualCycle">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">
            Did you have tattoo or piercing in the past 6 months?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("tattooPiercing", { required: true })}
              value="true"
            />
            <label for="tattooPiercing" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("tattooPiercing", { required: true })}
              value="false"
            />
            <label for="tattooPiercing">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">Are you on antibiotics?</label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("antibiotics", { required: true })}
              value="true"
            />
            <label for="antibiotics" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("antibiotics", { required: true })}
              value="false"
            />
            <label for="antibiotics">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">
            Do you have skin disease of some kind?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("skinDiseases", { required: true })}
              value="true"
            />
            <label for="skinDiseases" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("skinDiseases", { required: true })}
              value="false"
            />
            <label for="skinDiseases">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label className="label">
            Did you have dental intervention in the last 6 months?
          </label>
          <div className="radio-buttons">
            <input
              type="radio"
              {...register("dentalIntervention", { required: true })}
              value="true"
            />
            <label for="dentalIntervention" style={{ marginRight: "2rem" }}>
              Yes
            </label>
            <input
              type="radio"
              {...register("dentalIntervention", { required: true })}
              value="false"
            />
            <label for="dentalIntervention">No</label>
          </div>
        </div>
        <div className="submit-container-survey">
          <button
            onClick={handleSubmit(onSubmit)}
            className="orange-button btn-submit"
          >
            Submit
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

export default SurveyForm;
