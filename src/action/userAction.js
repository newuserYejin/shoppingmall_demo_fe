import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
import { type } from "@testing-library/user-event/dist/type";

const loginWithToken = () => async (dispatch) => { };
const loginWithEmail = (payload) => async (dispatch) => { };
const logout = () => async (dispatch) => { };

const loginWithGoogle = (token) => async (dispatch) => { };


const registerUser = ({ email, name, password }, navigate, setErrorResult) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST })
      const response = await api.post("/user", { email, name, password })

      if (response.status !== 200) {
        throw new Error(response.error)
      }

      dispatch(commonUiActions.showToastMessage("회원가입을 완료했습니다.", "success"))
      navigate('/login')
      dispatch({ type: types.REGISTER_USER_SUCCESS })
    } catch (error) {
      setErrorResult(true)
      console.log("error message:", error)
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message })
    }
  };


export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
