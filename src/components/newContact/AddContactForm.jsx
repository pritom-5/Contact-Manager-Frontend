import { useContext, useRef } from "react";
import AuthCtx from "../../context/AuthCtx";
import { useNavigate } from "react-router-dom";
import DisplayCtx from "../../context/DisplayCtx";

// TODO: print some info bottom of the login form
// proper error hander with message.
//

export default function AddContactForm() {
  const { showErrorModalHandler } = useContext(DisplayCtx);

  const navigate = useNavigate();

  const nameRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    // get token from local storage
    const token = localStorage.getItem("token");

    // get values from from ref
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = mailRef.current.value;

    // if user doesn't enter valid values
    if (!name || !phone || !email) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: "User info not correct",
      });
      return;
    }

    const input = { name, phone, email };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(input),
    };

    const response = await fetch(
      "http://localhost:5000/api/contacts",
      postOptions
    );

    const data = await response.json();

    // reset from after submit
    formRef.current.reset();

    // check if contact response is valid
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

    // navigate to contacts page
    navigate("/contacts");
  };

  return (
    <div className="login_form_section">
      <div className="title">Add New Contact</div>
      <div className="form">
        <form onSubmit={submitHandler} ref={formRef}>
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              min={3}
              max={15}
              required
              ref={nameRef}
            />
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              min={3}
              max={15}
              required
              ref={phoneRef}
            />
          </div>
          <div className="mail">
            <label htmlFor="mail">E-mail</label>
            <input
              type="email"
              name="mail"
              id="mail"
              min={3}
              max={15}
              required
              ref={mailRef}
            />
          </div>
          <input type="submit" value="Add New Contact" />
        </form>
      </div>
    </div>
  );
}
