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

export const adminReducer = (state = { user: {}, tasks: null }, action) => {
  switch (action.type) {
    case GETUSERS_REQUEST:
    case GETTODO_REQUEST:
    case GIVEREMARK_REQUEST:
      return {
        loading: true,
      };
    case GETUSERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GETTODO_SUCCESS:
    case GIVEREMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case GETUSERS_FAIL:
    case GETTODO_FAIL:
    case GIVEREMARK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
