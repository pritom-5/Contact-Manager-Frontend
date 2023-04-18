import { useEffect, useState } from "react";
import fetchDataFromDb from "../util/fetchDataFromDb";
import getSortedData from "../util/getSortedData";

export default function useDataFetchEffectHook(isLoggedIn, url, token = "") {
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    const fetchFn = async () => {
      if (!isLoggedIn) return;

      const data = await fetchDataFromDb(url, token);

      console.log(data);
      const sortedData = getSortedData(data);
      //console.log(sortedData);
      setDataState(sortedData);
    };
    fetchFn();
    //console.log("hook");
  }, [isLoggedIn]);

  const setDataStateFn = () => {
    // set data state from here
    return;
  };
  return { fetchedData: dataState, setDataStateFn };
}
