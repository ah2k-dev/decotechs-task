import {
  ADDTASK_REQUEST,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ADDTASK_FAIL,
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
export const userReducer = (state = { user: {}, tasks: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };

    case ADDTASK_REQUEST:
    case GETTASKS_REQUEST:
    case UPDATETASK_REQUEST:
    case DELETETASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDTASK_SUCCESS:
    case GETTASKS_SUCCESS:
    case UPDATETASK_SUCCESS:
    case DELETETASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case ADDTASK_FAIL:
    case GETTASKS_FAIL:
    case UPDATETASK_FAIL:
    case DELETETASK_FAIL:
      return {
        ...state,
        loading: false,
        tasks: {},
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: {},
        tasks: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
