import { createStore, combineReducers } from "redux";
import qAListReducer from "./reducers/qAList";

const allReducers = combineReducers({qAList: qAListReducer});

export default createStore(allReducers);