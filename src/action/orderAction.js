import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST })
    const response = await api.post("/order", payload)
    if (response.status !== 200) throw new Error(response.error)
    console.log("ordernum data:", response)
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum })
    // dispatch(commonUiActions.showToastMessage("주문완료", "success"))
    dispatch(cartActions.getCartQty())
    navigate('/payment/success')
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST })
    const response = await api.get('/order/my')
    console.log("my orderList", response.data)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.error })
  }
};

const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST })
    const response = await api.get('/order', { params: { ...query } })
    console.log("All orderList", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error })
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST })
    const response = await api.put(`/order/${id}`, { status })
    console.log('status update response', response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.UPDATE_ORDER_SUCCESS })
    dispatch(getOrderList({ page: 1, name: "" }))
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.error })
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
