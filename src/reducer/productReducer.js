import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: "",
  productList: [],
  totalPageNum: 1
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.GET_PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" }

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, error: "", productList: payload.data, totalPageNum: payload.totalPageNum }

    case types.PRODUCT_CREATE_FAIL:
    case types.GET_PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export default productReducer;
