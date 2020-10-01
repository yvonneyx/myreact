import { get, put, post, del } from "../utils/request";

/**
 * 获取列表
 * @param {*} page
 */
export function listApi(page = 1) {
  return get("/api/v1/products", { page });
}

/**
 * 创建数据
 * @param {*} data
 */
export function createApi(data) {
  return post("/api/v1/admin/products", data);
}

/**
 * 修改数据
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/api/v1/admin/products/${id}`, data);
}

/**
 * 删除数据
 * @param {*} id
 */
export function deleteOne(id) {
  return del(`/api/v1/admin/products/${id}`);
}
