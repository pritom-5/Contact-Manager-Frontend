import { createContext, useEffect, useState } from "react";

const initialContext = {
  isLoggedIn: false,
  isLoggedInHandler: (bool) => {},
};

const AuthCtx = createContext(initialContext);

export function AuthCtxProvider(props) {
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  // on first mount check if user isloggedIn
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) setIsLoggedInState(true);
  }, []);

  const isLoggedInHandlerFn = (bool) => {
    setIsLoggedInState(bool);
  };

  return (
    <AuthCtx.Provider
      value={{
        isLoggedIn: isLoggedInState,
        isLoggedInHandler: isLoggedInHandlerFn,
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
}

export default AuthCtx;
