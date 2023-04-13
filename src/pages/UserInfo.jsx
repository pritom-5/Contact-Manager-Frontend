import { useContext } from "react";
import AuthCtx from "../context/AuthCtx";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
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
    <div className="user_info">
      <div className="title">User Info</div>
      {/* img */}

      {/* username email */}
      {username}
      {email}
      {/* logout button */}
      <Button buttonHandler={logoutHandler} buttonTxt={"Logout"} />
    </div>
  );
}
