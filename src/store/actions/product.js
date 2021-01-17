import { listApi } from "../../services/products";

export const loadProduct = (payload) => async (dispatch) => {
  console.log(payload);
  debugger
  const res = await listApi();
  //当异步操作完成之后通过dispatch触发reducer改变数据
  dispatch({ type: "PRODUCT_LOADED", payload: res });
};
