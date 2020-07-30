import { LOGIN, LOGOUT, REGISTER, STORE_USER_INFO } from "../actions/types";

const initialState = {
  isLogin: false,
  token: "",
  username: "redux",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
      };
    case STORE_USER_INFO:
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      return { isLogin: false, token: "", username: "" };
    default:
      return { ...state };
  }
}
