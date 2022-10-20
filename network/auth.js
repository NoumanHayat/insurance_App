import { handleLowLevelAxiosError } from "../src/lib/utils/errors/error handling";
import axios from "./axios";
// import axios from 'axios';

// const MOCK = 'https://abb285ca-c07a-47a2-8e67-26cf2f1163a3.mock.pstmn.io';
/**
 *
 * @param {Object} props
 * @param {String} props.trn
 * @param {String} props.dob
 * @param {String} props.gender
 * @returns
 */
export const loginUser = async ({ trn, dob, gender }) => {
	let endpoint = `/auth/login/prelim`;

	let res = await axios.post(endpoint, { trn, dob, gender }).catch(handleLowLevelAxiosError);

	return res.data;
};

/**
 * request token to be sent to method
 *
 * @param {*} props
 * @param {String} props.customer - name of the customer
 * @param {String} props.phone - the masked number recieved
 * @param {String} props.email - the masked email recieved
 * @param {String} props.trn - the trn for the customer
 * @param {String} props.id - the user id returned at login
 * @returns
 */
export const requestOtp = async ({ customer, phone, email, trn, id }) => {
	let endpoint = "/auth/login/2fa";

	let res = await axios.post(endpoint, {
		customer,
		phone,
		email,
		trn,
		id,
	}).catch(handleLowLevelAxiosError);
	
	return { data: res.data, status: res.status } ;
};

/**
 * Verify the OTP token
 *
 * @param {*} props
 * @param {String} props.trn
 * @param {String} props.id
 * @param {String} props.otp
 * @param {String} props.transaction -  the type of transact being done e.g. 'renewal', 'paybalance'
 *
 * @param key: userid,
 * @param plate_num
 * @param policy_num
 * @param mother_maiden_name
 * @param transaction,
 * @returns
 */
export const verifyOtp = async ({ trn, id, otp, transaction }) => {
	let endpoint = "/auth/login/verify";

	let res = await axios.post(endpoint, { trn, id, otp, transaction }).catch(handleLowLevelAxiosError);
	
	return { data: res.data, status: res.status };
};

/**
 * Verify user via 'other' method
 *
 * @param {Object} props
 * @param {String} props.id
 * @param {String} props.transaction
 * @param {String} props.trn,
 * @param {String} props.policy_num
 * @param {String} props.plate_num
 * @param {String} props.mother_maiden_name
 * @param {Boolean} props.is_claim
 * @returns
 */
export const otherVerify = async ({
	id,
	transaction,
	trn,
	policy_num,
	plate_num,
	mother_maiden_name,
	is_claim,
}) => {
	let endpoint = `/auth/login/verify`;
	// console.log("DATA: ", id, transaction, trn, policy_num, plate_num, mother_maiden_name, is_claim)
	let res = await axios.post(endpoint, {
		trn,
		id,
		policy_num,
		plate_num,
		transaction,
		mother_maiden_name,
		is_claim,
	}).catch(handleLowLevelAxiosError);
	
	// console.log("Error: ", res.data)
	return { data: res.data, status: res.status };
};

/**
 * Get a new token
 *
 * @param {*} props
 * @param {String} props.token
 * @returns
 */
export const refreshAccessToken = async ({ token }) => {
	let endpoint = "/auth/login/refresh";

	let res = await axios.get(endpoint, {
		headers: {
			"x-access-token": token,
		},
	}).catch(handleLowLevelAxiosError);

	return res.data;
};
