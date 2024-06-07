import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";
import { type } from "@testing-library/user-event/dist/type";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST })
    const response = await api.get("/product", {
      params: { ...query }
    })
    console.log("response data", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data })
    // console.log("product data", response.data.data)
  } catch (error) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.error })
  }
};
const getProductDetail = (id) => async (dispatch) => { };

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST })
    const response = await api.post("/product", formData)

    if (response.status !== 200) {
      throw new Error(response.error)
    }

    dispatch({ type: types.PRODUCT_CREATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("상품 추가 완료", "success"))
    dispatch(getProductList());

  } catch (error) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST })
    const response = await api.delete(`/product/${id}`)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("product delete done", "success"))
    dispatch(getProductList({ page: 1, name: "" }))
  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST })
    const response = await api.put(`/product/${id}`, formData)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data })
    dispatch(commonUiActions.showToastMessage("product edit done", "success"))
    dispatch(getProductList({ page: 1, name: "" }))
  } catch (error) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
