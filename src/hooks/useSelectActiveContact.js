import { useEffect, useState } from "react";
import getUserLogoBasedOnName from "../util/getUserLogoBasedOnName";

export default function useSelectActiveContact(contacts) {
  const [activeConactState, setActiveContactState] = useState(); // id
  const [activeContactDetailsState, setActiveContactDetailsState] = useState(
    {}
  ); //full contact info , rgb color of emblem

  // TODO: check for first render. make a counter which runs everytime this fetched data changes

  // first mount select the first one
  useEffect(() => {
    if (!contacts.length) return;

    const activeContact = contacts[0];

    if (!activeContact) {
      setActiveContactDetailsState({});
      return;
    }

    const activeContactId = activeContact._id;
    setActiveContactState(activeContactId);

    // get rgb color from function
    const usersRgbLogo = getUserLogoBasedOnName(activeContact.name).rgb;
    setActiveContactDetailsState({ ...activeContact, rgb: usersRgbLogo });
  }, [contacts]);

  // use this funciton to select active contact from random component
  const setActiveConactStateFn = (activeContactInfo) => {
    const { id, rgb, name, email, phone } = activeContactInfo;
    if (!id) return;
    setActiveContactState(id);
    setActiveContactDetailsState({ id, rgb, name, email, phone });
  };

  return {
    activeConactState,
    setActiveConactStateFn,
    activeContactDetailsState,
  };
}
