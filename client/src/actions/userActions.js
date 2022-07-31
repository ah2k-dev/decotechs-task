import axios from "axios";

import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ADDTASK_FAIL,
  ADDTASK_REQUEST,
  ADDTASK_SUCCESS,
  GETTASKS_FAIL,
  GETTASKS_REQUEST,
  GETTASKS_SUCCESS,
  UPDATETASK_FAIL,
  UPDATETASK_REQUEST,
  UPDATETASK_SUCCESS,
  DELETETASK_FAIL,
  DELETETASK_REQUEST,
  DELETETASK_SUCCESS,
  LOGOUT_USER,
} from "../constants/userConstants";

axios.defaults.baseURL = "https://decotech-task.herokuapp.com";

//register user
export const register = (user) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post("/auth/register", user);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//login user
export const login = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/auth/login", user);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//add task
export const addTask = (task, id) => async (dispatch) => {
  dispatch({ type: ADDTASK_REQUEST });
  try {
    const { data } = await axios.post(`/user/addTodo/${id}`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: ADDTASK_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADDTASK_FAIL, payload: error.response.data.message });
  }
};

//get tasks
export const getTasks = (id) => async (dispatch) => {
  dispatch({ type: GETTASKS_REQUEST });
  try {
    const { data } = await axios.get(`/user/getTodo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GETTASKS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GETTASKS_FAIL, payload: error.response.data.message });
  }
};

//update task
export const updateTask = (task, id) => async (dispatch) => {
  dispatch({ type: UPDATETASK_REQUEST });
  try {
    const { data } = await axios.put(`/user/updateTodo/${id}`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: UPDATETASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATETASK_FAIL, payload: error.response.data.message });
  }
};

//delete task
export const deleteTask = (id) => async (dispatch) => {
  dispatch({ type: DELETETASK_REQUEST });
  try {
    const { data } = await axios.delete(`/user/removeTodo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: DELETETASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETETASK_FAIL, payload: error.response.data.message });
  }
};

//logout user
//i used the cookie to presist login but there's a problem with deployment as heroku charges $10 for enabling ACM
export const logout = () => (dispatch) => {      
  dispatch({ type: LOGOUT_USER });
}

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
