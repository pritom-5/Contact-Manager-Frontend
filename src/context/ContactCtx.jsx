// check if user is logged in.
// get all the contacts list
// set active contact on click or first contact on mount

import { createContext, useContext, useState } from "react";
import testContacts from "../dataTest/contactsTest.json";
import useSelectActiveContact from "../hooks/useSelectActiveContact";
import useDataFetchEffectHook from "../hooks/useDataFetchEffectHook";
import {
  GET_ALL_CONTACTS_URL,
  GET_USER_DETAILS_URL,
} from "../constants/constants";
import getTokenFromLocalStorage from "../util/getTokenFromLocalStorage";
import AuthCtx from "./AuthCtx";
import useUserDetailsFetch from "../hooks/useUserDetailsFetch";

const defaultContactContext = {
  contacts: [],
  addNewContactToContactsListHandler: (contactInfo) => {},
  activeContact: "id",
  setActiveConactStateFn: (id) => {},
  activeContactDetailsState: { id: "", name: "", email: "", phone: "" },
  removeContactsListFromStateFn: () => {},
  userDetails: "",
};

const ContactCtx = createContext(defaultContactContext);

export function ContactCtxProvider({ children }) {
  const { isLoggedIn } = useContext(AuthCtx);

  const token = getTokenFromLocalStorage("token");

  const {
    fetchedData: allContactsList,
    setDataStateFn,
    removeContactsListFromStateFn,
  } = useDataFetchEffectHook(isLoggedIn, GET_ALL_CONTACTS_URL, token);

  const {
    activeConactState,
    setActiveConactStateFn,
    activeContactDetailsState,
  } = useSelectActiveContact(allContactsList);

  const userDetailsState = useUserDetailsFetch(GET_USER_DETAILS_URL, token);

  return (
    <ContactCtx.Provider
      value={{
        contacts: allContactsList,
        addNewContactToContactsListHandler: setDataStateFn,
        activeContact: activeConactState,
        setActiveConactStateFn,
        activeContactDetailsState,
        removeContactsListFromStateFn,
        userDetails: userDetailsState,
      }}
    >
      {children}
    </ContactCtx.Provider>
  );
}

export default ContactCtx;
