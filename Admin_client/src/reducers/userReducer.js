import { LOGIN, LOGOUT, STORE_USER_INFO } from "../actions/types";

const initialState = {
  isLogin: false,
  token: "",
  detail_info: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        detail_info: action.payload.user,
      };
    case STORE_USER_INFO:
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      return { isLogin: false, token: "", detail_info: "" };
    default:
      return { ...state };
  }
}
