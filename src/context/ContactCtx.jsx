import { createContext, useContext, useState } from "react";
import testContacts from "../dataTest/contactsTest.json";
import useSelectActiveContact from "../hooks/useSelectActiveContact";
import useDataFetchEffectHook from "../hooks/useDataFetchEffectHook";
import { GET_ALL_CONTACTS } from "../constants/constants";
import getTokenFromLocalStorage from "../util/getTokenFromLocalStorage";
import AuthCtx from "./AuthCtx";

const defaultContactContext = {
  contacts: [],
  activeContact: "id",
  setActiveConactStateFn: (id) => {},
  activeContactDetailsState: { id: "", name: "", email: "", phone: "" },
};

const ContactCtx = createContext(defaultContactContext);

export function ContactCtxProvider({ children }) {
  const { isLoggedIn } = useContext(AuthCtx);

  const token = getTokenFromLocalStorage("token");
  const { fetchedData: allContactsList } = useDataFetchEffectHook(
    isLoggedIn,
    GET_ALL_CONTACTS,
    token
  );

  const {
    activeConactState,
    setActiveConactStateFn,
    activeContactDetailsState,
  } = useSelectActiveContact(allContactsList);

  return (
    <ContactCtx.Provider
      value={{
        contacts: allContactsList,
        activeContact: activeConactState,
        setActiveConactStateFn,
        activeContactDetailsState,
      }}
    >
      {children}
    </ContactCtx.Provider>
  );
}

export default ContactCtx;

// TODO:
// fetch contacts on first render here.
// then if user adds new contact just give a function to append it to the contacts list
// give user option to edit the contact and delete the contact
