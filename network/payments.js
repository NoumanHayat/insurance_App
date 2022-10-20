import { handleLowLevelAxiosError } from '../src/lib/utils/errors/error handling';
// import axios from './axios';
import Constants from "expo-constants";
import axios from 'axios';

const BASE_URL = 'https://abb285ca-c07a-47a2-8e67-26cf2f1163a3.mock.pstmn.io';
const UAT = 'https://uat.advantagegeneral.com/node/v2';
const DOTUAT = 'https://uat.advantagegeneral.com:8090/api';
const baseURL = Constants.manifest.extra.api_url;
export const getPaymentPlanOptions = async (token, payload) => {
    let response = await axios
    .post(`${baseURL}/api/getPaymentOptions`, payload, { headers: { "x-access-token": token } })
    .catch(handleLowLevelAxiosError);

return response.data;

}

// retrieve payment plan
export const getPolicyPaymentPlan = async (policy_id) => {
    const auth = await axios.get(`${DOTUAT}/auth`);
    const key = auth.data[0]?.Response[0]?.key
	let plan = {};
    let encoded_policy_id = encodeURIComponent(policy_id)
    console.log('auth: ', encoded_policy_id);
	let endpoint = `${DOTUAT}/getPolicyPaymentPlan/?token=${key}&policy_id=${encoded_policy_id}`;
	plan = await axios.get(endpoint);
	return plan;
};

export const createSession = async (merchantId, payload) => {
    let response = await axios
    .post(`${BASE_URL}/form/version/50/merchant/${merchantId}/session`, payload).catch(handleLowLevelAxiosError);
    // .then(res => console.log(res))
    // .catch(handleLowLevelAxiosError);

return response.data;

}

export const sagicorPayment = async (merchantId, uuid, payload) => {
    let response = await axios
    .put(`${BASE_URL}/api/rest/version/50/merchant/${merchantId}/order/${uuid}/transaction/2`, payload
    // , {
    //     headers: {
    //         "x-mock-match-request-body": true
    //     }
    // }
    )
    .catch(handleLowLevelAxiosError);

return response.data;

}

export const agicPayment = async (payload) => {
    let response = await axios.put(`${UAT}/payments`, payload)
    // console.log(response.data);
    return response.data;

}

