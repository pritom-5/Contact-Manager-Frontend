import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCtx from "../../context/DisplayCtx";
import postDataToDb from "../../util/postDataToDb";
import { POST_REGISTER } from "../../constants/constants";

export default function RegisterForm() {
  const { showErrorModalHandler } = useContext(DisplayCtx);

  const navigate = useNavigate();

  const textRef = useRef();
  const passRef = useRef();
  const mailRef = useRef();
  const formRef = useRef();

  // form submit
  const submitHandler = async (e) => {
    e.preventDefault();

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

    const dataReturnedFromDb = await postDataToDb(POST_REGISTER, input);
    const { message, username: returnedUsername, status } = dataReturnedFromDb;

    // reset from after submit
    formRef.current.reset();

    // check if register response is valid
    if (status !== 200) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: message,
      });
      return;
    }

    // show success modal
    showErrorModalHandler({
      show: true,
      type: "success",
      message: message,
    });

    // navigate to login page
    navigate("/login");
  };

  return (
    <div className="form_container">
      <div className="form_title">Register</div>
      <form onSubmit={submitHandler} ref={formRef} className="form_section">
        <div className="username input_section ">
          <label className="input_label" htmlFor="username">
            Username
          </label>
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
        <div className="password input_section">
          <label className="input_label" htmlFor="password">
            Password
          </label>
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
        <div className="email input_section">
          <label className="input_label" htmlFor="email">
            Email
          </label>
          <input
            className="input_field"
            type="email"
            name="email"
            id="email"
            min={3}
            max={15}
            required
            ref={mailRef}
          />
        </div>
        <input type="submit" value="Register" className="submit_button" />
      </form>
    </div>
  );
}
