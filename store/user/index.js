import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const defaultState = {
	user: null,
};

let userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state) => {
			state.user = action.payload;
		},
		resetUser: () => defaultState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, (state, action) => defaultState);
	},
});

export const getUser = ({ user: state }) => state.user;
export const getFullName = ({ user: state }) =>
	`${state.user?.first_name || ""} ${state.user?.last_name || ""}`.trim() || null;

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
