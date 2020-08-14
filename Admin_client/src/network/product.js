import { request } from "./request.js";
export function addOrUpdateProductAPI(data) {
  let url = !!data.id ? "/admin/product/update" : "/admin/product/add";
  return request({
    url,
    method: "POST",
    data,
  });
}
export function getProductAPI(params) {
  return request({
    url: "/admin/product/",
    params,
  });
}
export function searchProductAPI(params) {
  return request({
    url: "/admin/product/search",
    params,
  });
}