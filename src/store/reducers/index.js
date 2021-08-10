import { combineReducers } from "redux";

import CommonReducer from './Common';
import UserReducer from './User';

const reducers = combineReducers({
	common: CommonReducer,
	user: UserReducer
});
export default reducers;