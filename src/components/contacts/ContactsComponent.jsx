import { useContext, useEffect, useState } from "react";
import ContactComponent from "./ContactComponent";
import ContactCtx from "../../context/ContactCtx";
import css from "./ContactsComponent.module.css";
export default function ContactsComponent() {
  const { contacts } = useContext(ContactCtx);

  return (
    <div id="contacts_comp_section" className={css.contacts_section}>
      <div className={`${css.contact_header} form_title`}>Contacts List</div>
      <div className={css.contacts_list}>
        {contacts.map((item) => {
          const { _id: id } = item;
          return <ContactComponent key={id} contactInfo={item} />;
        })}
      </div>
    </div>
  );
}
