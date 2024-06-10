import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST })
    const response = await api.post("/order", payload)
    if (response.status !== 200) throw new Error(response.error)
    // dispatch({ type: types.CREATE_ORDER_SUCCESS})
    dispatch(commonUiActions.showToastMessage("정상처리 되었습니다."))
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage("오류가 발생했습니다."))
  }
};

const getOrder = () => async (dispatch) => { };
const getOrderList = (query) => async (dispatch) => { };

const updateOrder = (id, status) => async (dispatch) => { };

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
