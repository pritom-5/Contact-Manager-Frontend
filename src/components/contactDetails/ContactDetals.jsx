import { useContext } from "react";
import ContactCtx from "../../context/ContactCtx";
import css from "./ContactDetails.module.css";
import { Link } from "react-router-dom";

export default function ContactDetails() {
  // get values from context
  const { activeContactDetailsState } = useContext(ContactCtx);
  const {
    id,
    name: contactName,
    email,
    phone,
    rgb,
    letter,
  } = activeContactDetailsState;

  return (
    <div id="contact_details_section" className={`${css.details_section}`}>
      <div className="title_section form_title">Details</div>
      <Link to={"/editContact"}>Edit</Link>
      <div
        id="header_section"
        className={css.header}
        style={{ backgroundColor: `${rgb}` }}
      >
        <div id="name">{contactName}</div>
      </div>
      {!!id ? (
        <div id="info_section" className={css.info_section}>
          <div id="email" className={css.field}>
            <div id="title" className={css.fieldtitle}>
              Email
            </div>
            <div id="value" className={css.fieldvalue}>
              {email}
            </div>
          </div>

          <div id="phone" className={css.field}>
            <div id="title" className={css.fieldtitle}>
              Phone
            </div>
            <div id="value" className={css.fieldvalue}>
              {phone}
            </div>
          </div>
        </div>
      ) : (
        <div>Please add new contacts</div>
      )}
    </div>
  );
}
