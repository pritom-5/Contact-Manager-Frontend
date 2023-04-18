export default async function postDataToDb(url, inputPayload, token = "") {
  const requestObj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(inputPayload),
  };
  if (!!token) {
    requestObj.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(url, requestObj);
    const dataReturnedFromDb = await response.json();

    return dataReturnedFromDb;
  } catch (error) {
    console.log(error);
  }
}
