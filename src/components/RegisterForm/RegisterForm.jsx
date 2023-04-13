import { useContext, useRef } from "react";
import AuthCtx from "../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import DisplayCtx from "../../context/DisplayCtx";

export default function RegisterForm() {
  const { showErrorModalHandler } = useContext(DisplayCtx);

  const navigate = useNavigate();

  const textRef = useRef();
  const passRef = useRef();
  const mailRef = useRef();

  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    // get values from from ref
    const username = textRef.current.value;
    const password = passRef.current.value;
    const email = mailRef.current.value;

    if (!username || !password || !email) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: "User info not correct",
      });
      return;
    }

    const input = { username, password, email };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(input),
    };

    const response = await fetch(
      "http://localhost:5000/api/users/register",
      postOptions
    );
    const data = await response.json();

    // reset from after submit
    formRef.current.reset();

    // check if register response is valid
    if (data.status !== 200) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: data.message,
      });
      return;
    }

    // show success modal
    showErrorModalHandler({
      show: true,
      type: "success",
      message: data.message,
    });

    // navigate to login page
    navigate("/login");
  };

  return (
    <div className="login_form_section">
      <div className="title">Register</div>
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
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              min={3}
              max={15}
              required
              ref={mailRef}
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}
