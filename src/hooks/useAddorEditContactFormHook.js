import { useContext, useRef, useState } from "react";
import getTokenFromLocalStorage from "../util/getTokenFromLocalStorage";
import DisplayCtx from "../context/DisplayCtx";
import { useNavigate } from "react-router-dom";
import postDataToDb from "../util/postDataToDb";
import ContactCtx from "../context/ContactCtx";

export default function useAddorEditContactFormHook(
  tokenKey,
  url,
  type,
  fnToRunAfterSubmit
) {
  // form input values state
  const { showErrorModalHandler } = useContext(DisplayCtx);

  // get active contact info to get id from there
  const { activeContact } = useContext(ContactCtx);

  // navigete hook
  const navigate = useNavigate();

  // fetch method
  const method = type === "add" ? "POST" : "PUT";

  // refs to pass to from
  const nameRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const formRef = useRef();

  const refsObj = { nameRef, phoneRef, mailRef, formRef };

  // submit handler function
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      // get token from local storage
      const token = getTokenFromLocalStorage(tokenKey);

      // get values from from ref
      const name = nameRef.current.value;
      const phone = phoneRef.current.value;
      const email = mailRef.current.value;

      // if user doesn't enter valid values
      if (!name || !phone || !email) {
        throw new Error("Input values are not valid");
      }

      const input = { name, phone, email };

      const dataReturnedFromDb = await postDataToDb(url, input, token, method);

      //////////test
      console.log(dataReturnedFromDb);

      if (!dataReturnedFromDb) {
        throw new Error("Cannection Error");
      }

      const {
        message,
        status,
        returnedContact: { _id },
      } = dataReturnedFromDb;

      // reset form
      formRef.current.reset();

      // check if contact response is valid
      if (status !== 200) {
        throw new Error("Can't add contact to database");
      }

      // add data temporarily to all contacts state
      let argument;
      switch (type) {
        case "add":
          argument = {
            _id,
            ...input,
          };
          break;
        case "edit":
          argument = {
            _id,
            ...input,
          };

        default:
          break;
      }
      fnToRunAfterSubmit(argument);

      // show success modal
      showErrorModalHandler({
        show: true,
        type: "success",
        message: message,
      });

      // navigate to contacts page
      navigate("/contacts");
    } catch (err) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: err.message,
      });
    }
  };

  return { refsObj, submitHandler };
}

// TODO: change message: err.messge -> 'something went wrong please try again later
