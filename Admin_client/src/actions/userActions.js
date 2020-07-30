import { LOGIN, LOGOUT, REGISTER, STORE_USER_INFO } from "./types";
export const login_reducer = (response) => {
  return { type: LOGIN, payload: response };
};
export const store_user_info = (user) => {
  return { type: STORE_USER_INFO, payload: user };
};
export const register_reducer = (id) => {
  return { type: REGISTER, payload: id };
};
export const logout_reducer = () => {
  return { type: LOGOUT };
};