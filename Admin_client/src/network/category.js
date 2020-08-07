import { request } from "./request.js";
export function getCategory(params) {
  return request({
    url: "/category",
    params,
  });
}
export function addCategoryAPI(data) {
  return request({
    url: "/category/add",
    method: "POST",
    data,
  });
}
export function updateCategoryAPI(data) {
  return request({
    url: "/category/update",
    method: "POST",
    data,
  });
}
