import useAddorEditContactFormHook from "../../hooks/useAddorEditContactFormHook";

const defaultInputsObj = {
  name: "",
  email: "",
  phone: "",
};

export default function AddContactForm({
  tokenKey,
  url,
  type,
  fnToRunAfterSubmit,
  defaultInputs = defaultInputsObj,
  Header = "Add New Contact",
  submitText = "Add Contact",
}) {
  const { refsObj, submitHandler } = useAddorEditContactFormHook(
    tokenKey,
    url,
    type,
    fnToRunAfterSubmit
  );

  const { formRef, mailRef, nameRef, phoneRef } = refsObj;

  const {
    name: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
  } = defaultInputs;

  return (
    <div className="form_container">
      <div className="form_title">{Header}</div>
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
            defaultValue={defaultName}
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
            defaultValue={defaultPhone}
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
            defaultValue={defaultEmail}
          />
        </div>
        <input type="submit" value={submitText} className="submit_button" />
      </form>
    </div>
  );
}
