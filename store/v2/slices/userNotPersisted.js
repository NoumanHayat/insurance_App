import { createSlice } from "@reduxjs/toolkit";

/** This is the "user" object which is returned from the server. */
const initialState = {
	user: null,
};

const slice = createSlice({
	name: "userNP",
	initialState,
	reducers: {
		rdxSetUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

const { reducer, actions } = slice;

// Selectors
export const getUser = (state) => state?.userNP?.user;

export const {	rdxSetUser } = actions;
export default reducer;
