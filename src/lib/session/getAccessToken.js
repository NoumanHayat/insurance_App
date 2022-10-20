import { SERVER } from "@env";
import { handleFirstFetchThen } from "../utils/network/general";

export const getAccessToken = async (refreshToken) => {
	return fetch(`${SERVER}/auth/login/refresh`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": refreshToken,
		}
	})
		.then(handleFirstFetchThen)
		.then((data) => ({ ...data }))
		.catch(err => {
			console.error(err);
			throw err;
		});
};


