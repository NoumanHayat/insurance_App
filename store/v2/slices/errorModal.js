import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isVisible: false,
	customError: {
        title: "",
        message: "",
        blueBtnText: "Try Again",
        greyBtnText: "Dismiss"
    },
};

const slice = createSlice({
	name: "errorModal",
	initialState,
	reducers: {
		rdxSetIsErrorModalVisible: (state, action) => {
			state.isVisible = action.payload;
		},
		rdxSetErrorModalCustomError: (state, action) => {
			state.customError = action.payload;
		},
	},
});

const { actions, reducer } = slice;

export const getIsErrorModalVisible = (state) => state.errorModal.isVisible;
export const getErrorModalCustomError = (state) => state.errorModal.customError;

export const { rdxSetErrorModalCustomError, rdxSetIsErrorModalVisible } = actions;

export default reducer;
