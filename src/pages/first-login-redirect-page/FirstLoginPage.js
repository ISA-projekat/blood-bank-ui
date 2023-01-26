import "./FirstLoginPage.scss";
import { useState } from "react";
import { changeAdminPassword } from "../../services/admin/AdminService";
import { useContext } from "react";
import AuthContext from "../../store/bloodbank/login/login-context";
import { useNavigate } from "react-router";
import PageLayout from "../../components/Layout/MainLayout/PageLayout";

const FirstLoginPage = () => {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  function changeNewPassword(newPass) {
    setNewPassword(newPass);
  }

  function changeConfirmNewPassword(confirmNewPass) {
    setConfirmPassword(confirmNewPass);
  }

  function ChangePassword() {
    let dto = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      adminId: context.user.id,
    };
    //console.log(dto);
    changeAdminPassword(dto);
    navigate("/blood-banks");
  }

  return (
    <PageLayout class={"fieldds"}>
      <input
        value={newPassword}
        onChange={(event) => changeNewPassword(event.target.value)}
      ></input>
      <input
        value={confirmPassword}
        onChange={(event) => changeConfirmNewPassword(event.target.value)}
      ></input>
      <button onClick={ChangePassword}>Confirm</button>
    </PageLayout>
  );
};

export default FirstLoginPage;
