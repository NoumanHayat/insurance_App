import authSlice from "./auth";
import userSlice from "./user";
import policySlice from "./user";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { composeWithDevTools } from "remote-redux-devtools";

let config = {
	key: "root",
	storage: AsyncStorage,
};

let rootReducer = combineReducers({
	auth: authSlice,
	user: userSlice,
	policy: policySlice,
});

let persistedReducer = persistReducer(config, rootReducer);

// const store = configureStore({
// 	reducer: persistedReducer,
// });

const store = configureStore({
	reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
