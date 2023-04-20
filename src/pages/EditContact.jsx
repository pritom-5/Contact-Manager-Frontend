import { useContext } from "react";
import AddContactForm from "../components/newContact/AddContactForm";
import { PUT_EDIT_CONTACT_URL_fn } from "../constants/constants";
import ContactCtx from "../context/ContactCtx";

export default function EditContact() {
  const { editContactFromContactsListHandler, activeContactDetailsState } =
    useContext(ContactCtx);
  const { id } = activeContactDetailsState;
  const PUT_EDIT_CONTACT_URL = PUT_EDIT_CONTACT_URL_fn(id);
  return (
    <div id="edit_contact_section">
      <AddContactForm
        tokenKey="token"
        url={PUT_EDIT_CONTACT_URL}
        type="edit"
        fnToRunAfterSubmit={editContactFromContactsListHandler}
        defaultInputs={activeContactDetailsState}
        Header="Edit Contact"
        submitText="Edit Contact"
      />
    </div>
  );
}
