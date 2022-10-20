import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const initialState = {
	firstName: "",
	name: "",
	trn: "",
	gender: "",
	dob: "",
	userId: "",
	phoneNumbers: [],
	maskedPhoneNumbers: [], // for 2fa
	email: "",
	policyNumber: "",
	plateNumber: ""
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		rdxSetTrn: (state, action) => {
			state.trn = action.payload;
		},
		rdxSetUserId: (state, action) => {
			state.userId = action.payload;
		},
		rdxSetPhoneNumbers: (state, action) => {
			state.phoneNumbers = action.payload;
		},
		rdxSetMaskedSetPhoneNumbers: (state, action) => {
			state.maskedPhoneNumbers = action.payload;
		},
		rdxSetFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		rdxSetName: (state, action) => {
			state.name = action.payload;
		},
		rdxSetGender: (state, action) => {
			state.gender = action.payload;
		},
		rdxSetEmail: (state, action) => {
			state.email = action.payload;
		},
		rdxSetPolicyNumber: (state, action) => {
			state.policyNumber= action.payload;
		},
		rdxSetPlateNumber: (state, action) => {
			state.plateNumber = action.payload;
		},
		rdxResetUser: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, () => initialState);
	},
});

const { reducer, actions } = slice;

// Selectors
export const getTrn = (state) => state.user.trn;
export const getUserId = (state) => state.user.userId;
export const getPhoneNumbers = (state) => state.user.phoneNumbers;
export const getMaskedPhoneNumbers = (state) => state.user.maskedPhoneNumbers;
export const getName = (state) => state.user.name;
export const getGender = (state) => state.user.gender;
export const getEmail = (state) => state.user.email;
export const getFirstName = (state) => state.user.firstName;
export const getPolicyNumber = (state) => state.user.policyNumber;
export const getPlateNumber = (state) => state.user.plateNumber;
export const getUserState = (state) => state.user;

export const {
	rdxSetTrn,
	rdxSetUserId,
	rdxSetPhoneNumbers,
	rdxSetMaskedSetPhoneNumbers,
	rdxSetName,
	rdxResetUser,
	rdxSetGender,
	rdxSetEmail,
	rdxSetFirstName,
	rdxSetPolicyNumber,
	rdxSetPlateNumber
} = actions;
export default reducer;
