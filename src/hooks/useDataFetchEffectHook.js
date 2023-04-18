import { useEffect, useState } from "react";
import fetchDataFromDb from "../util/fetchDataFromDb";
import getSortedData from "../util/getSortedData";

export default function useDataFetchEffectHook(url, token = "") {
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    const fetchFn = async () => {
      const data = await fetchDataFromDb(url, token);
      const sortedData = getSortedData(data);
      console.log(sortedData);
      setDataState(sortedData);
    };
    fetchFn();
    console.log("hook");
  }, []);

  const setDataStateFn = () => {
    // set data state from here
    return;
  };
  return { fetchedData: dataState, setDataStateFn };
}
