import { handleLowLevelAxiosError } from "../src/lib/utils/errors/error handling";
import axios from "./axios";

export const updateUser = async ({ token, payload }) => {
	const endpoint = `/api/globalNameSubmit`;

	let response = await axios.post(endpoint, payload, { headers: { "x-access-token": token } }).catch(handleLowLevelAxiosError);

	return response.data;
};
