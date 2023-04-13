import { useEffect, useState } from "react";
import data from "../../dataTest/contactsTest.json";

export default function ContactsComponent() {
  const [contacts, setContacts] = useState([]);

  console.log(data);

  //   useEffect(() => {
  //     const fetchFn = async () => {
  //       // get token from localStorage
  //       const token = localStorage.getItem("token");
  //       const responseObj = {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       };
  //       const response = await fetch(
  //         "http://localhost:5000/api/contacts",
  //         responseObj
  //       );
  //       const data = await response.json();

  //       // TODO:
  //       //   if data.status !== 200 ; redirect to home page
  //       // show error message

  //       console.log(data);
  //     };
  //     fetchFn();
  //   }, []);

  return <div id="contacts_comp_section">contacts comp</div>;
}
