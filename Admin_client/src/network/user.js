import { request } from "./request";
export function addUserAPI(data) {
  return request({
    url: "/admin/user/add",
    method: "POST",
    data,
  });
}
export function editUserAPI(data) {
  return request({
    url: "/admin/user/update",
    method: "POST",
    data,
  });
}
export function deleteUserAPI(data) {
  return request({
    url: "/admin/user/delete",
    method: "POST",
    data,
  });
}
export function getUsersAPI() {
  return request({
    url: "/admin/user/",
  });
}
