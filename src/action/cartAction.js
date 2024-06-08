import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
import { type } from "@testing-library/user-event/dist/type";
const addToCart = ({ id, size }) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TO_CART_REQUEST })
    const response = await api.post('/cart', { productId: id, selectSize: size, qty: 1 })
    console.log("cart response:", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty })
    dispatch(commonUiActions.showToastMessage("add to cart success", "success"))
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage("This item is already in cart", "error"))
  }
};

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST })
    const response = await api.get('/cart')
    console.log("cartList response:", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error })
  }
};


const deleteCartItem = (id) => async (dispatch) => { };

const updateQty = (id, value) => async (dispatch) => { };
const getCartQty = () => async (dispatch) => { };
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
