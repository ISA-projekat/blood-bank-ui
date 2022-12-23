import TextFieldControl from "../../components/forms/controls/TextFieldControl";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormRules from "../../components/forms/rules/FormRules";
import { registerAdministrator } from "../../services/admin/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router";



const AdminRegistrationForm = () => {
  const form = useForm();
  

  const {
    data,
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(dto) {
    console.log(dto);
    const regDto = { ...dto, gender: "MALE" };
    const response = await registerAdministrator(regDto);
    if (!response || !response.ok) {
      toast.error(response.message);
      return;
    }

    toast.success("Welcome to our family", {
      position: toast.POSITION.TOP_RIGHT,
    });
    
  }

  const confirmPasswordRule = {
    validate: (val) => val === watch("password") || "Passwords do not match",
    required: { value: true, message: "Confirm password is required" },
  };

  return (
    <div className={"form-wrapper"}>
      <FormProvider {...form}>
        <div className="group-items">
          <h2>User information</h2>
          <div className="row-items">
            <div className={"form-item"}>
              <TextFieldControl
                label={"First name"}
                name={"firstName"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName && errors.firstName.message}
              />
            </div>
            <div className={"form-item"}>
              <TextFieldControl
                label={"Last Name"}
                name={"lastName"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName && errors.lastName.message}
              />
            </div>
          </div>
          <div className="row-items">
            <div className={"form-item"}>
              <TextFieldControl
                label={"Email"}
                name={"email"}
                control={control}
                defaultValue=""
                rules={FormRules["email"]}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
            </div>
            <div className={"form-item"}>
              <TextFieldControl
                label={"JMBG"}
                name={"jmbg"}
                control={control}
                defaultValue=""
                rules={FormRules["jmbg"]}
                error={Boolean(errors.jmbg)}
                helperText={errors.jmbg && errors.jmbg.message}
              />
            </div>
          </div>
          <div className="row-items">
            <div className={"form-item"}>
              <TextFieldControl
                label={"Occupation"}
                name={"occupation"}
                control={control}
                defaultValue=""
                rules={FormRules["required"]}
                error={Boolean(errors.occupation)}
                helperText={errors.occupation && errors.occupation.message}
              />
            </div>
            <div className={"form-item"}>
              <TextFieldControl
                label={"Phone number"}
                name={"phoneNumber"}
                control={control}
                defaultValue=""
                rules={FormRules["phoneNumber"]}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber && errors.phoneNumber.message}
              />
            </div>
          </div>
        </div>

        <div className="group-items">
          <h2>Address</h2>
          <div className="row-items">
            <div className={"form-item"}>
              <TextFieldControl
                label={"Country"}
                name={"country"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.country)}
                helperText={errors.country && errors.country.message}
              />
            </div>
            <div className={"form-item"}>
              <TextFieldControl
                label={"City"}
                name={"city"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.city)}
                helperText={errors.city && errors.city.message}
              />
            </div>
          </div>
          <div className="row-items">
            <div className={"form-item"}>
              <TextFieldControl
                label={"Street"}
                name={"street"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.street)}
                helperText={errors.street && errors.street.message}
              />
            </div>
            <div className={"form-item"}>
              <TextFieldControl
                label={"Number"}
                name={"number"}
                control={control}
                defaultValue=""
                rules={FormRules["name"]}
                error={Boolean(errors.number)}
                helperText={errors.number && errors.number.message}
              />
            </div>
          </div>
        </div>

        <div className="group-items">
          <h2>Password information</h2>
          <div className="row-items">
            <div className={"form-item"}>
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
            <div className={"form-item"}>
              <TextFieldControl
                label={"Confirm password"}
                name={"confirmPassword"}
                control={control}
                type={"password"}
                defaultValue=""
                rules={confirmPasswordRule}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            </div>
          </div>
        </div>

        <div className="submit-container">
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

export default AdminRegistrationForm;
