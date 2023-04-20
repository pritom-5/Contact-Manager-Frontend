export default async function postDataToDb(
  url,
  inputPayload,
  token = "",
  method
) {
  const requestObj = {
    method,
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

    if (!dataReturnedFromDb) {
      throw new Error("Can't post data");
    }

    return dataReturnedFromDb;
  } catch (error) {
    console.log(error);
  }
}
