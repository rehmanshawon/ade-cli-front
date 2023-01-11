import API from "../../../helpers/devApi";
export const LOGIN_URL = `/auth/login`;
export const REGISTER_URL = `/auth/signup`;
export const REQUEST_PASSWORD_URL = `/auth/forgot-password`;
export const ME_URL = `/sys_users`;
export const MODULE_URL = `/sys_modules`;
export const MENU_URL = `/sys_menus`;

export async function login(email, password) {
  return await API.post(LOGIN_URL, { email, password });
}

export function register(email, user_name, password) {
  return API.post(REGISTER_URL, { email, user_name, password });
}

export async function getModuleList() {
  return await API.get(MODULE_URL);
}

export async function getUserByToken(id) {
  // Authorization head should be fulfilled in interceptor.
  return await API.get(`${ME_URL}/${id}`);
}

export async function updateProfile(id, payload) {
  // Authorization head should be fulfilled in interceptor.
  return await API.patch(`${ME_URL}/${id}`, payload);
}

export async function getMenuByModule(menuType) {
  // Authorization head should be fulfilled in interceptor.
  return await API.get(`${MENU_URL}?field=module_id&search=${menuType}`);
}
