import * as types from "../constants/order.constants";

const initialState = {
  orderNum: null,
  loading: false,
  error: null,
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null }

    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: null, orderNum: payload }

    case types.CREATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload }

    default:
      return state;
  }

}
export default orderReducer;
