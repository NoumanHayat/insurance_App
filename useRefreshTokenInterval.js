import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REFRESH_INTERVAL } from "./constants";
import { getAccess, getRefresh, rdxSetAccessToken, rdxSetAuth } from "./store/v2/slices/session";
import { getAccessToken } from "./src/lib/session/refreshAccessToken";

/**
 * handles token refresh. ( side effect - also sets auth state to false if refresh token stops working TODO: remove to a better location )
 *
 * @param {Object} params
 * @param {pauseRefresh} params.pauseRefresh
 * @param {*} params.onError
 */
const useRefreshAccessTokenOnInterval = ({ pauseRefresh = true, onError }) => {
	const dispatch = useDispatch();
	const refreshToken = useSelector(getRefresh);
	const accessToken = useSelector(getAccess);

	const fetchAndSetAccessToken = async (refreshToken) => {
		let { success, status, access_token } = await getAccessToken(refreshToken);

		if (success) {
			dispatch(rdxSetAccessToken(access_token));
		} else {
			if (refreshToken && status === 401) {
				// refreshtoken is no longer valid, we need to log in
				dispatch(rdxSetAuth(false));
			}
		}
	};

	useEffect(() => {
		if (!pauseRefresh && refreshToken) {
			let interval = setInterval(() => {
				try {
					fetchAndSetAccessToken(refreshToken);
				} catch (error) {
					onError && onError(error);
				}
			}, REFRESH_INTERVAL);

			return () => {
				clearInterval(interval);
			};
		}
	}, [refreshToken, accessToken, pauseRefresh]);
};

export { useRefreshAccessTokenOnInterval as useRefreshTokenInterval };
