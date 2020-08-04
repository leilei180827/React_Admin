import { request } from "./request.js";
export function getCategory(params) {
  return request({
    url: "/category",
    params,
  });
}
