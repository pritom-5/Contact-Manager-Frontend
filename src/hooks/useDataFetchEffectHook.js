import { useEffect, useState } from "react";
import fetchDataFromDb from "../util/fetchDataFromDb";
import getSortedData from "../util/getSortedData";

export default function useDataFetchEffectHook(isLoggedIn, url, token = "") {
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    const fetchFn = async () => {
      if (!isLoggedIn) return;

      const data = await fetchDataFromDb(url, token);

      const sortedData = getSortedData(data);
      setDataState(sortedData);
    };
    fetchFn();
  }, [isLoggedIn]);

  const setDataStateFn = (contactInfo) => {
    const { id, name, phone, email } = contactInfo;
    // set data state from here
    setDataState((prev) => [...prev, { ...contactInfo }]);
  };

  const removeContactsListFromStateFn = () => {
    setDataState([]);
  };
  return {
    fetchedData: dataState,
    setDataStateFn,
    removeContactsListFromStateFn,
  };
}
