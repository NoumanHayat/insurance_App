import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const initialState = {
	class: "",
	dateIss: "",
	dateExp: "",
};

const slice = createSlice({
	name: "license",
	initialState,
	reducers: {
		rdxSetClass: (state, action) => {
			state.class = action.payload;
		},
		rdxSetDateIss: (state, action) => {
			state.dateIss = action.payload;
		},
		rdxSetDateExp: (state, action) => {
			state.dateExp = action.payload;
		},
		rdxResetLicense: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, () => initialState);
	},
});

const { actions, reducer } = slice;

export const getClass = (state) => state.license.class;
export const getDateIss = (state) => state.license.dateIss;
export const getDateExp = (state) => state.license.dateExp;

export const { rdxSetClass, rdxSetDateIss, rdxSetDateExp, rdxResetLicense } = actions;

export default reducer;
