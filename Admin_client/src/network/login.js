import { request } from "./request.js";
export function login_network(options) {
  return request({
    url: "/login",
    method: "POST",
    data: options,
  });
}
