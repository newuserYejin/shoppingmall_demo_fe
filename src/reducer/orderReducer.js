import * as types from "../constants/order.constants";

const initialState = {
  orderNum: null,
  loading: false,
  error: null,
  orderList: [],
  totalPageNum: 1,
  selectedOrder: null,
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null }

    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: null, orderNum: payload }

    case types.GET_ORDER_SUCCESS:
    case types.GET_ORDER_LIST_SUCCESS:
      return { ...state, loading: false, error: null, orderList: payload.data, totalPageNum: payload.totalPageNum }

    case types.UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false }

    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
    case types.UPDATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload }

    case types.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: payload }

    default:
      return state;
  }

}
export default orderReducer;
