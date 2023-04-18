import ContactDetails from "../components/contactDetails/ContactDetals";
import ContactsComponent from "../components/contacts/ContactsComponent";
import Nav from "../components/nav/Nav";

export default function Contacts() {
  return (
    <div className="contacts_container">
      <Nav />
      <div id="contacts_and_details_section" style={{ display: "flex" }}>
        <ContactsComponent />
        <ContactDetails />
      </div>
    </div>
  );
}
