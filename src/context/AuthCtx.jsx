import { createContext, useEffect, useState } from "react";
import { GET_USER_DETAILS_URL } from "../constants/constants";

const initialContext = {
  isLoggedIn: false,
  isLoggedInHandler: (bool) => {},
  userInfo: { username: "", email: "" },
};

const AuthCtx = createContext(initialContext);

export function AuthCtxProvider(props) {
  // ERROR: change login state false
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [userInfoState, setUserInfoState] = useState({});

  // on first mount check if user isloggedIn
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) setIsLoggedInState(true);
  }, []);

  // check for user details only when isLoggedInState changes
  // if isLoggedIn -> true -> get get userDetails
  useEffect(() => {
    // if user is not logged in return from here.
    if (!isLoggedInState) return;

    // if user is logged in then fetch user details
    // get userInfo from api/users/details
    const fetchUserInfoFn = async () => {
      const token = localStorage.getItem("token");
      const requestObj = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };
      const response = await fetch(GET_USER_DETAILS_URL, requestObj);
      const data = await response.json();

      // if data undefined of message is unauthorized
      if (!data || data.message === "unauthorized") return;

      const { username, email, message, status } = data;

      setUserInfoState({ username, email });
    };

    fetchUserInfoFn();
  }, [isLoggedInState]);

  const isLoggedInHandlerFn = (bool) => {
    setIsLoggedInState(bool);
  };

  return (
    <AuthCtx.Provider
      value={{
        isLoggedIn: isLoggedInState,
        isLoggedInHandler: isLoggedInHandlerFn,
        userInfo: userInfoState,
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
}

export default AuthCtx;
