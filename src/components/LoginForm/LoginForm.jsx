import { useContext, useRef } from "react";
import Button from "../UI/Button";
import AuthCtx from "../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import DisplayCtx from "../../context/DisplayCtx";

// TODO: print some info bottom of the login form
// proper error hander with message.
//

export default function LoginForm() {
  const { isLoggedInHandler } = useContext(AuthCtx);
  const { showErrorModalHandler } = useContext(DisplayCtx);

  const navigate = useNavigate();

  const textRef = useRef();
  const passRef = useRef();
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    // get values from from ref
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

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(input),
    };

    /// ERROR: .env not working
    const response = await fetch(
      "http://localhost:5000/api/users/login",
      postOptions
    );
    const data = await response.json();

    // reset from after submit
    formRef.current.reset();

    // check if login response is valid
    if (data.status !== 200) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: data.message,
      });
      return;
    }

    // save token to local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", true);

    // show success modal
    showErrorModalHandler({
      show: true,
      type: "success",
      message: data.message,
    });

    // update context to isLoggedIn -> true
    isLoggedInHandler(true);

    // navigate to contacts page
    navigate("/contacts");
  };
  return (
    <div className="login_form_section">
      <div className="title">Login</div>
      <div className="form">
        <form onSubmit={submitHandler} ref={formRef}>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              min={3}
              max={15}
              required
              ref={textRef}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              min={3}
              max={15}
              required
              ref={passRef}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
