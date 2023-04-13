import { useContext } from "react";
import Button from "../UI/Button";
import DisplayCtx from "../../context/DisplayCtx";

export default function LoginRegister() {
  const {
    showLoginSectionHandler,
    showRegisterSecitonHandler,
    showRegisterLoginSectionHandler,
  } = useContext(DisplayCtx);

  return (
    <div className="login_register_section">
      Login / Register to access contacts
      <Button buttonHandler={showLoginSectionHandler} buttonTxt={"Login"} />
      <Button
        buttonHandler={showRegisterSecitonHandler}
        buttonTxt={"Register"}
      />
    </div>
  );
}
