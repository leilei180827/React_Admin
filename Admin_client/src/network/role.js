import { request } from "./request";
export function addRoleAPI(data) {
  return request({
    url: "/admin/role/add",
    method: "POST",
    data,
  });
}
export function updateRoleAPI(data) {
    return request({
      url: "/admin/role/update",
      method: "POST",
      data,
    });
  }
export function getRolesAPI() {
  return request({
    url: "/admin/role",
  });
}
