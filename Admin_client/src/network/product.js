import { request } from "./request.js";
export function addOrUpdateProductAPI(data) {
  console.log(data._id);
  let url = data._id ? "/admin/product/update" : "/admin/product/add";
  console.log(url);
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
