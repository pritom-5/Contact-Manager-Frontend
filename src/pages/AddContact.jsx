import { useContext } from "react";
import AddContactForm from "../components/newContact/AddContactForm";
import { POST_NEW_CONTACT_URL } from "../constants/constants";
import ContactCtx from "../context/ContactCtx";

export default function AddContact() {
  const { addNewContactToContactsListHandler } = useContext(ContactCtx);
  return (
    <div className="add_contact_section">
      <AddContactForm
        tokenKey="token"
        url={POST_NEW_CONTACT_URL}
        type="add"
        fnToRunAfterSubmit={addNewContactToContactsListHandler}
      />
    </div>
  );
}

// TODO: pass url, formtype, default values from here.
