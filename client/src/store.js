import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";
const reducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
});

let initialState = {user: 'hello'};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
