import { useContext } from "react";
import getUserLogoBasedOnName from "../../util/getUserLogoBasedOnName";
import ContactCtx from "../../context/ContactCtx";
import css from "./ContactComponent.module.css";

export default function ContactComponent({ contactInfo }) {
  const { _id: id, name, email, phone } = contactInfo;
  const { activeContact, setActiveConactStateFn } = useContext(ContactCtx);

  const rbgOfContactLogo = getUserLogoBasedOnName(name);
  const { letter, rgb } = rbgOfContactLogo;

  const activeContactDetails = { id, name, email, phone, rgb };

  // conditional styles;
  const contactSectionClass =
    activeContact === id
      ? `${css.active} ${css.contact_section}`
      : `${css.contact_section}`;

  return (
    <div
      id="contact-section"
      className={contactSectionClass}
      onClick={() => setActiveConactStateFn(activeContactDetails)}
    >
      <div className={css.logo} style={{ backgroundColor: `${rgb}` }}>
        {letter}
      </div>
      <div className="name_value">{name}</div>
    </div>
  );
}
