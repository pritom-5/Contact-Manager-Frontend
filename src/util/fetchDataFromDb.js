export default async function fetchDataFromDb(url, token = "") {
  const requestObj = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  if (!!token) {
    requestObj.headers.Authorization = `Bearer ${token}`;
    requestObj.credentials = "include";
  }
  const response = await fetch(url, requestObj);
  const data = await response.json();

  //console.log("function");

  return data;
}
