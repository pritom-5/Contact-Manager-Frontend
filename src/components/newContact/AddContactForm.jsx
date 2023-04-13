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
    <div className="form_container">
      <div className="form_title">Add New Contact</div>
      <form onSubmit={submitHandler} ref={formRef} className="form_section">
        <div className="name input_section">
          <label className="input_label" htmlFor="name">
            Name
          </label>
          <input
            className="input_field"
            type="text"
            name="name"
            id="name"
            min={3}
            max={15}
            required
            ref={nameRef}
          />
        </div>
        <div className="phone input_section">
          <label className="input_label" htmlFor="phone">
            Phone
          </label>
          <input
            className="input_field"
            type="text"
            name="phone"
            id="phone"
            min={3}
            max={15}
            required
            ref={phoneRef}
          />
        </div>
        <div className="mail input_section">
          <label className="input_label" htmlFor="mail">
            E-mail
          </label>
          <input
            className="input_field"
            type="email"
            name="mail"
            id="mail"
            min={3}
            max={15}
            required
            ref={mailRef}
          />
        </div>
        <input
          type="submit"
          value="Add New Contact"
          className="submit_button"
        />
      </form>
    </div>
  );
}
