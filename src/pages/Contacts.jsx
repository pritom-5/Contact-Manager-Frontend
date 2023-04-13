import ContactsComponent from "../components/contacts/ContactsComponent";
import Nav from "../components/nav/Nav";

export default function Contacts() {
  return (
    <div className="contacts_section">
      Contacts
      {/* nav goes here */}
      <Nav />
      {/* show contacts if logged in */}
      {/* show login button if not logged in */}
      <ContactsComponent />
    </div>
  );
}
