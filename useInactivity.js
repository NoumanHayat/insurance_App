import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MAX_INACTIVITY_TIME, WARNING_TIME, WILL_EXPIRE_ZONE } from "./constants";
import { getAuthStatus, getLastActive, rdxSetLastActive } from "./store/v2/slices/session";

/**
 *
 * @param {Object} param
 * @param {*} param.inactivityCallback
 * @param {Boolean} param.isPersistent
 * @returns { {willExpireSoon: Boolean, resetActiveness: Function }} returns a variable on the state of the timeout and a way to manually refresh the token.
 */
const useInactivity = ({ authExpiredCallback, isPersistent }) => {
	const dispatch = useDispatch();
	const lastActiveDate = useSelector(getLastActive);

	const appState = useRef(AppState.currentState);
	const isUserAuthenticated = useSelector(getAuthStatus);
	const [willExpireSoon, setWillExpireSoon] = useState(false);

	function toggleActiveness() {
		if (willExpireSoon) setWillExpireSoon(false);
	}

	/** Listen to see if the app is transitioning from an 'active' to a 'background' state.*/
	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {

			if (appState.current.match(/active/) && nextAppState === "background") {
				dispatch(rdxSetLastActive(new Date()));
			}

			appState.current = nextAppState;
		});

		return () => {
			// subscription.remove();
		};
	}, []);

	/*** when the app loses focus then regains focus - check if last activity was outside of allowed inactive time */
	useEffect(() => {
		if (!isPersistent && isUserAuthenticated && lastActiveDate) {
			const timeElapsedSinceLastActive = moment(new Date()) - moment(lastActiveDate);
			if (timeElapsedSinceLastActive >= MAX_INACTIVITY_TIME) {
				authExpiredCallback && authExpiredCallback();
			} else if (timeElapsedSinceLastActive >= WILL_EXPIRE_ZONE) {
				// Auth about to expire, but hasn't as yet
				setWillExpireSoon(true);
			}
			dispatch(rdxSetLastActive(null)); //why?
		}
	}, [lastActiveDate]);

	/**
	 * add events for keyup and mouse move
	 */
	useEffect(() => {
		if (isUserAuthenticated && !isPersistent) {
			let timeout;
			let debounce;
			const handleTimeout = () => {
				let lastActive = new Date();

				if (debounce) clearTimeout(debounce);
				debounce = setTimeout(() => {
					if (timeout) clearTimeout(timeout);
					timeout = setTimeout(
						() => {
							const timeElapsedSinceLastActive = moment(new Date()) - moment(lastActive);
							let authWillExpire = timeElapsedSinceLastActive >= WILL_EXPIRE_ZONE && isUserAuthenticated;

							if (timeElapsedSinceLastActive >= WARNING_TIME && willExpireSoon) {
								// potential mismatch. Both of these conditions
								// should always be the same.

								// the last 30s has expired
								authExpiredCallback();
								setWillExpireSoon(false);
							} else if (authWillExpire !== willExpireSoon) {
								setWillExpireSoon(authWillExpire);
							}
						},
						willExpireSoon ? WARNING_TIME : WILL_EXPIRE_ZONE
					);
				}, 600);
			};

			const clearTimeoutVal = () => {
				if (timeout) clearTimeout(timeout);
				if (debounce) clearTimeout(debounce);
			};

			handleTimeout();

			// cleanup
			return () => {
				clearTimeoutVal();
			};
		}
	}, [willExpireSoon, authExpiredCallback, isUserAuthenticated]);

	/** listen to mouse movement and key up and update after 40s */
	return {
		resetActiveness: toggleActiveness,
		willExpireSoon,
	};
};

export { useInactivity };
