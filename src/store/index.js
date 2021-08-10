import { createStore, applyMiddleware, Store  } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducers from "./reducers/";

const store: Store = createStore(rootReducers, applyMiddleware(
    thunkMiddleware
));

store.subscribe(() => {});

export {
	store
};