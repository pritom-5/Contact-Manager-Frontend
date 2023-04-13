import { createContext, useEffect, useState } from "react";

const initialDisplayContext = {
  modalControlState: false,
  showErrorModal: { show: false, type: "error", message: "" },
  showErrorModalHandler: () => {},
};

const DisplayCtx = createContext(initialDisplayContext);

export function DisplayCtxProvider(props) {
  const [showErrorModal, setShowErrorModal] = useState({
    show: false,
    type: "error",
    message: "",
  });

  // timeout tracker state
  const [timeoutState, setTimeoutState] = useState();

  const showErrorModalHandler = (errorInfo) => {
    const { show, type, message } = errorInfo;
    setShowErrorModal({ show: true, type, message });

    // timeout retirns id which is stored in timeoutState
    const timeout = setTimeout(() => {
      setShowErrorModal({ show: false, type: "error", message: "" });
      clearTimeout(timeoutState);
    }, 5000);

    setTimeoutState(timeout);
  };

  return (
    <DisplayCtx.Provider
      value={{
        showErrorModal,
        showErrorModalHandler,
      }}
    >
      {props.children}
    </DisplayCtx.Provider>
  );
}

export default DisplayCtx;
