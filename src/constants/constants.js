const DOMAIN = "http://localhost:5000";
const GET_ALL_CONTACTS_URL = `${DOMAIN}/api/contacts`;
const POST_NEW_CONTACT_URL = `${DOMAIN}/api/contacts`;
const PUT_EDIT_CONTACT_URL_fn = (id) => {
  return `${DOMAIN}/api/contacts/${id}`;
};
const POST_REGISTER_URL = `${DOMAIN}/api/users/register`;
const POST_LOGIN_URL = `${DOMAIN}/api/users/login`;
const GET_USER_DETAILS_URL = `${DOMAIN}/api/users/details`;

export {
  DOMAIN,
  GET_ALL_CONTACTS_URL,
  PUT_EDIT_CONTACT_URL_fn,
  POST_REGISTER_URL,
  POST_LOGIN_URL,
  POST_NEW_CONTACT_URL,
  GET_USER_DETAILS_URL,
};
