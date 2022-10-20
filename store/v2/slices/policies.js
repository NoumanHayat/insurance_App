import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	policies: [],
	toastNotif: null
};

const slice = createSlice({
	name: "policies",
	initialState,
	reducers: {
		rdxSetPolicies: (state, action) => {
			state.policies = action.payload;
		},
		rdxSetToastNotif: (state, action) => {
			state.toastNotif = action.payload;
		},
		rdxResetUser: () => initialState,
	},
});

const { reducer, actions } = slice;

// Selectors
export const getPolicies = (state) => state.policies.policies;
export const getToastNotif = (state) => state.toastNotif;

export const { rdxSetPolicies, rdxSetToastNotif } = actions;
export default reducer;
