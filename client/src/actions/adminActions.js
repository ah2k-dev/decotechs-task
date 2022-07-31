import {
  GETUSERS_FAIL,
  GETUSERS_REQUEST,
  GETUSERS_SUCCESS,
  GETTODO_FAIL,
  GETTODO_REQUEST,
  GETTODO_SUCCESS,
  GIVEREMARK_FAIL,
  GIVEREMARK_REQUEST,
  GIVEREMARK_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/adminConstants";
import axios from "axios";
axios.defaults.baseURL = "https://decotech-task.herokuapp.com";

//get all users
export const getUsers = () => async (dispatch) => {
  dispatch({ type: GETUSERS_REQUEST });
  try {
    const { data } = await axios.get("/admin/getUsers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    // console.log(data);
    dispatch({ type: GETUSERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETUSERS_FAIL, payload: error.response.data.message });
  }
};

//get todos
export const getTodos = (id) => async (dispatch) => {
  dispatch({ type: GETTODO_REQUEST });
  try {
    const { data } = await axios.get(`/admin/getTodo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: GETTODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETTODO_FAIL, payload: error.response.data.message });
  }
};

//give remark
export const giveRemark = (remarks, id) => async (dispatch) => {
  dispatch({ type: GIVEREMARK_REQUEST });
  try {
    const { data } = await axios.put(`/admin/giveRemarks/${id}`, {
      remarks,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GIVEREMARK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GIVEREMARK_FAIL, payload: error.response.data.message });
  }
};

//clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
