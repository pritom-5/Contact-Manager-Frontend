import { useContext, useEffect, useState } from "react";
import fetchDataFromDb from "../util/fetchDataFromDb";
import getTokenFromLocalStorage from "../util/getTokenFromLocalStorage";
import DisplayCtx from "../context/DisplayCtx";

export default function useUserDetailsFetch(url, token) {
  const { showErrorModalHandler } = useContext(DisplayCtx);
  const [userDetailsState, setUserDetailsState] = useState({});

  const getUserDetails = async () => {
    try {
      if (!token) {
        throw new Error("unauthorized");
      }

      const data = await fetchDataFromDb(url, token);
      if (data.status !== 200) {
        throw new Error("Can't fetch details");
      }
      setUserDetailsState(data);
    } catch (error) {
      showErrorModalHandler({
        show: true,
        type: "error",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return userDetailsState;
}
