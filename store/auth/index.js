import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const defaultState = {
	trn: "",
	gender: "",
	dob: "",
	userId: "",
	token: "",
	refresh: "",
	phoneNumbers: [],
};

let authSlice = createSlice({
	name: "auth",
	initialState: defaultState,
	reducers: {
		// setRefeshToken: (state, action) => {
		// 	state.refresh = action.payload;
		// },
		setAccessToken: (state, action) => {
			state.token = action.payload;
		},
		setGender: (state, action) => {
			state.gender = action.payload;
		},
		setTrn: (state, action) => {
			state.trn = action.payload;
		},
		setDob: (state, action) => {
			state.dob = action.payload;
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
		setPhoneNumbers: (state, action) => {
			state.phoneNumbers = action.payload;
		},
		resetAuth: () => defaultState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, (state, action) => defaultState);
	},
});

export const getUserId = ({ auth: state }) => state.userId;
export const getRefreshToken = ({ auth: state }) => state.refresh;
export const getAccessToken = ({ auth: state }) => state.token;
export const getTrn = ({ auth: state }) => state.trn;
export const getDob = ({ auth: state }) => state.dob;
export const getGender = ({ auth: state }) => state.gender;

export const { setAccessToken, setRefeshToken, setTrn, setDob, setGender, setUserId, setPhoneNumbers } =
	authSlice.actions;

export default authSlice.reducer;
