import { combineReducers } from "redux";
import fetchInfoReducer from "./reducers";

export default combineReducers({
    prInfo: fetchInfoReducer,
});