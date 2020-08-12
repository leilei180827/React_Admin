import { request } from "./request.js";
export function getCategory(params) {
  return request({
    url: "/admin/category",
    params,
  });
}
export function addCategoryAPI(data) {
  return request({
    url: "/admin/category/add",
    method: "POST",
    data,
  });
}
export function updateCategoryAPI(data) {
  return request({
    url: "/admin/category/update",
    method: "POST",
    data,
  });
}

