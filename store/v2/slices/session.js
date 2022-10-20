import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const initialState = {
	isPersistent: false,
	authenticated: false,
	refreshToken: "",
	accessToken: "",
	lastActive: new Date(),
	rememberMeTimeStamp: null,
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		rdxSetPersist: (state, action) => {
			state.isPersistent = action.payload;
		},
		rdxSetRefresh: (state, action) => {
			state.refreshToken = action.payload;
		},
		rdxSetAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		rdxSetAuth: (state, action) => {
			state.authenticated = action.payload;
		},
		rdxSetLastActive: (state, action) => {
			state.lastActive = action.payload;
		},
		rdxSetRememberMeTimestamp: (state,action) => {
			state.rememberMeTimeStamp = action.payload;
		},
		rdxResetSession: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, () => initialState);
	},
});

const { reducer, actions } = slice;

// Selectors
export const getPersist = (state) => state.session.isPersistent;
export const getRefresh = (state) => state.session.refreshToken;
export const getAccess = (state) => state.session.accessToken;
export const getAuthStatus = (state) => state.session.authenticated;
export const getLastActive = (state) => state.session.lastActive;
export const getRememberMeTimestamp = (state) => state.session.rememberMeTimeStamp;
export const getSession = (state) => state.session;

export const { 
	rdxSetPersist, 
	rdxSetAccessToken, 
	rdxSetRefresh, 
	rdxSetAuth, 
	rdxSetLastActive, 
	rdxResetSession, 
	rdxSetRememberMeTimestamp,
} = actions;
export default reducer;
