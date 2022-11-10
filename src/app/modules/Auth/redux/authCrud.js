import API from "../../../helpers/devApi";
export const LOGIN_URL = `/auth/login`;
export const REGISTER_URL = `/auth/register`;
export const REQUEST_PASSWORD_URL = `/auth/forgot-password`;
export const ME_URL = `/auth/profile`;
export const MODULE_URL = `/sys_modules`;
export const MENU_URL = `/sys_menus`;

export async function login(email, password) {
  return await API.post(LOGIN_URL, { email, password });
}

// export function register(email, fullname, username, password) {
//   return postAPI(REGISTER_URL, { email, fullname, username, password });
// }

export async function getModuleList() {
  return await API.get(MODULE_URL);
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return await API.get(ME_URL);
}

export async function getMenuByModule(menuType) {
  // Authorization head should be fulfilled in interceptor.
  return await API.get(`${MENU_URL}?field=module_id&search=${menuType}`);
}
