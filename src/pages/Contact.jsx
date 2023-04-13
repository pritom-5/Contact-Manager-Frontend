import { useParams } from "react-router-dom";

export default function Contact() {
  const { contactId } = useParams();
  return <div className="contact_section">contact {contactId}</div>;
}
