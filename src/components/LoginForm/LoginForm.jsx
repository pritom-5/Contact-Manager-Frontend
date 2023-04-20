import { useContext, useRef } from "react";
import AuthCtx from "../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import DisplayCtx from "../../context/DisplayCtx";
import postDataToDb from "../../util/postDataToDb";
import { POST_LOGIN_URL } from "../../constants/constants";

export default function LoginForm() {
  const { isLoggedInHandler } = useContext(AuthCtx);
  const { showErrorModalHandler } = useContext(DisplayCtx);

  const navigate = useNavigate();

  const textRef = useRef();
  const passRef = useRef();
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const username = textRef.current.value;
    const password = passRef.current.value;

    if (!username || !password) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: "User info not correct",
      });
      return;
    }

    const input = { username, password };

    const dataReturnedFromDb = await postDataToDb(
      POST_LOGIN_URL,
      input,
      "",
      "POST"
    );
    const { message, status, token } = dataReturnedFromDb;

    // reset from after submit
    formRef.current.reset();

    //    check if login response isn't valid send error modal
    if (status !== 200) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: message,
      });
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", true);

    showErrorModalHandler({
      show: true,
      type: "success",
      message: message,
    });

    // update context to isLoggedIn -> true
    isLoggedInHandler(true);

    // redirect to contacts page
    navigate("/contacts");
  };

  return (
    <div className="form_container">
      <div className="form_title">Login</div>
      <form onSubmit={submitHandler} ref={formRef} className="form_section">
        <div className="input_section">
          <label htmlFor="username">Username</label>
          <input
            className="input_field"
            type="text"
            name="username"
            id="username"
            min={3}
            max={15}
            required
            ref={textRef}
          />
        </div>
        <div className="input_section">
          <label htmlFor="password">Password</label>
          <input
            className="input_field"
            type="password"
            name="password"
            id="password"
            min={3}
            max={15}
            required
            ref={passRef}
          />
        </div>
        <input type="submit" value="Login" className="submit_button" />
      </form>
    </div>
  );
}
