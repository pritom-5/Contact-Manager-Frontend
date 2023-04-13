import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import AuthCtx from "../../context/AuthCtx";
import css from "./UserInfoComponent.module.css";

export default function UserInfoComponent() {
  const { userInfo, isLoggedInHandler } = useContext(AuthCtx);
  const { email, username } = userInfo;
  const navigate = useNavigate();

  const logoutHandler = () => {
    // clear token and isLoggedIn from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    // change context of isLoggedIn to false
    isLoggedInHandler(false);

    // redirect to home directory
    navigate("/");
  };
  return (
    <div className={css.user_info}>
      <div className="form_title">User Info</div>
      <div id="info_section" className={css.info_section}>
        <div className={css.initial}>A</div>
        {/* username email */}
        <div id={css.username_section}>
          <div id="label" className={`input_label`}>
            Username
          </div>
          <div id="username_value" className={css.value}>
            Username
          </div>
        </div>
        <div id="email_section">
          <div id="title" className="input_label">
            Email
          </div>
          <div id="email_value" className={css.value}>
            email@email.com
          </div>
        </div>
        <Button buttonHandler={logoutHandler} buttonTxt={"Logout"} />
      </div>

      {/* logout button */}
    </div>
  );
}
