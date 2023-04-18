import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import AuthCtx from "../../context/AuthCtx";
import css from "./UserInfoComponent.module.css";
import ContactCtx from "../../context/ContactCtx";
import fetchDataFromDb from "../../util/fetchDataFromDb";
import { GET_USER_DETAILS_URL } from "../../constants/constants";
import getTokenFromLocalStorage from "../../util/getTokenFromLocalStorage";
import DisplayCtx from "../../context/DisplayCtx";
import useUserDetailsFetch from "../../hooks/useUserDetailsFetch";

export default function UserInfoComponent() {
  const { userInfo, isLoggedInHandler } = useContext(AuthCtx);
  const { removeContactsListFromStateFn } = useContext(ContactCtx);

  const token = getTokenFromLocalStorage("token");
  const userDetailsState = useUserDetailsFetch(GET_USER_DETAILS_URL, token);
  const { email, username } = userDetailsState;

  const navigate = useNavigate();

  // on logout button click
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    // change context of isLoggedIn to false
    isLoggedInHandler(false);

    // clear current contacts list state
    removeContactsListFromStateFn();

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
            {username}
          </div>
        </div>
        <div id="email_section">
          <div id="title" className="input_label">
            Email
          </div>
          <div id="email_value" className={css.value}>
            {email}
          </div>
        </div>
        <Button buttonHandler={logoutHandler} buttonTxt={"Logout"} />
      </div>

      {/* logout button */}
    </div>
  );
}
