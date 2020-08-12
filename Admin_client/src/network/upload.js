import { request } from "./request.js";
export function uploadImagesAPI(data) {
  return request({
    url: "/admin/upload/adds",
    method: "POST",
    data,
  });
}
export function deleteSingleImageAPI(data) {
  return request({
    url: "/admin/upload/delete",
    method: "POST",
    data,
  });
}
export function uploadSingleImageAPI(data) {
  return request({
    url: "/admin/upload/add",
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
