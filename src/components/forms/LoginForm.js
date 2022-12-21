import React, { useContext, useState } from "react";
import TextFieldControl from "./controls/TextFieldControl";
import TextFieldPasswordControl from "./controls/TextFieldPasswordControl";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormRules from "./rules/FormRules";
import { loginUser } from "../../services/user/UserService";
import { useNavigate } from "react-router";
import AuthContext from "../../store/bloodbank/login/login-context";

const LoginForm = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(AuthContext);

  const {
    data,
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (dto) => {
    loginUser(dto).then((response) => {
      if (!response || !response.ok) {
        setErrorMessage("Invalid credentials");
        return;
      }

      // Response vraca token
      console.log(response.data);
      context.login(response.data);
      navigate("/blood-banks");
    });
  };

  return (
    <div className={"form-wrapper"}>
      <FormProvider {...form}>
        <div className="form-item full-width">
          <TextFieldControl
            label={"Email"}
            name={"email"}
            control={control}
            defaultValue=""
            rules={FormRules["email"]}
            errors={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
          />
        </div>
        <div className="form-item full-width">
          <TextFieldControl
            label={"Password"}
            name={"password"}
            control={control}
            type={"password"}
            defaultValue=""
            rules={FormRules["password"]}
            error={Boolean(errors.password)}
            helperText={errors.password && errors.password.message}
          />
        </div>
        <div className="submit-container-start">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="orange-button btn-submit"
          >
            Submit
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
