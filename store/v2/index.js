import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore"

import userReducer from "./slices/user";
import userNotPersistedReducer from "./slices/userNotPersisted";
import licenseReducer from "./slices/license";
import sessionReducer from "./slices/session";
import policiesReducer from "./slices/policies";
import errorModalReducer from "./slices/errorModal";

const storage = createSecureStore();

let rootConfig = {
	key: 'root',
	storage,
	blacklist: ['policies', 'userNP', 'errorModal']
};

const userConfig = {
	key: 'user',
	storage,
	blacklist: ['maskedPhoneNumbers']
}

const sessionConfig = {
	key: 'session',
	storage,
	blacklist: ['accessToken']
}

const rootReducer = combineReducers({
	user: persistReducer(userConfig, userReducer),
	license: licenseReducer,
	session: persistReducer(sessionConfig,sessionReducer),
	policies: policiesReducer,
	userNP: userNotPersistedReducer,
	errorModal: errorModalReducer,
});

const persistedRed = persistReducer(rootConfig, rootReducer);

const _store = createStore(persistedRed);
const _persistor = persistStore(_store);

export { _store, _persistor };
