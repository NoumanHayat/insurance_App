import { createSlice } from "@reduxjs/toolkit";
import { fullLogout } from "../misc";

const defaultState = {
	policies: null,
	renewablePolicies: null,
	additionBenefits: null,
	activePolicyId: null,
	breakdown: null,
	paymentPlans: null,
	selectedAddOns: [],
};

let policySlice = createSlice({
	name: "policy",
	initialState: defaultState,
	reducers: {
		setPolicies: (state, action) => {
			state.policies = action.payload;
		},
		setRenewablePolicies: (state) => {
			state.renewablePolicies = action.payload;
		},
		setAdditionalBenefits: (state) => {
			state.additionBenefits = action.payload;
		},
		setBreakdown: (state) => {
			state.breakdown = action.payload;
		},
		setPaymentPlans: (state) => {
			state.paymentPlans = action.payload;
		},
		setActivePolicyId: (state) => {
			state.activePolicyId = action.payload;
		},
		resetPolicy: () => defaultState,
	},
	extraReducers: (builder) => {
		builder.addCase(fullLogout, (state, action) => defaultState);
	},
});

export const getPolicies = ({ policy: state }) => state.policies;
export const getRenwablePolicies = ({ policy: state }) => state.policies;
export const getActivePolicy = ({ policy: state }) =>
	state.policies.find((val) => val.policy_id === state.activePolicyId);
export const getBreakdown = ({ policy: state }) => state.breakdown;
export const getPaymentPlans = ({ policy: state }) => state.paymentPlans;
export const getAdditionalBenefits = ({ policy: state }) => state.additionBenefits;
export const getSelectedAddons = ({ policy: state }) => state.selectedAddOns;

export const {
	setActivePolicyId,
	setAdditionalBenefits,
	setBreakdown,
	setPaymentPlans,
	setPolicies,
	setRenewablePolicies,
	resetPolicy,
} = policySlice.actions;

export default policySlice.reducer;
