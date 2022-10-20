import React, { useEffect, useRef, useCallback, useState } from "react";
import { Platform, LogBox, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector, useDispatch, batch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import debounce from "lodash.debounce";
import { ToastProvider } from 'react-native-toast-notifications'

import SplashSecondary from "./src/screens/Prototype/Splash Screens/Splash Screen - Secondary";
import Switch from "./src/screens/Prototype/Switch";
import UserContext from "./src/context/context";
import { _store, _persistor } from "./store/v2";
import {
	getRefresh,
	getPersist,
	rdxSetAccessToken,
	rdxSetAuth,
	getAuthStatus,
	getRememberMeTimestamp,
	rdxSetLastActive,
	rdxResetSession
} from "./store/v2/slices/session";
import {
	getUserId,
	getTrn,
	getPolicyNumber,
	getPlateNumber,
} from './store/v2/slices/user';
import { rdxSetUser } from "./store/v2/slices/userNotPersisted";
import { getPolicies, rdxSetPolicies, rdxSetToastNotif } from "./store/v2/slices/policies";
import {
	getErrorModalCustomError,
	getIsErrorModalVisible,
	rdxSetIsErrorModalVisible
} from "./store/v2/slices/errorModal";
import { getAccessToken } from "./src/lib/session/getAccessToken";
import {
	PERSISTENCE_WINDOW,
	ACCESS_TOKEN_REFRESH_INTERVAL,
	MAX_USER_INACTIVITY,
	AUTH_WILL_EXPIRE_IN,
} from "./src/lib/session/CONSTANTS";
import {
	getTimeElapsedSince,
	createInterval,
	createAuthExpirationTimeout,
	evergreenScreens
} from "./src/lib/session/general";
import { createAppStateListener } from "./src/lib/session/appStateListener";
import { otherVerify } from "./network/auth"
import BlankErrorModal from "./src/components/modals/errors/BlankErrorModal";
import { useDisplayErrorModal, useHandleTopLevelAxiosError } from "./src/lib/utils/hooks/error handling";

LogBox.ignoreAllLogs();

function App() {

	const [userActive, setUserActive] = useState(true);

	const dispatch = useDispatch();
	const handleTopLevelAxiosError = useHandleTopLevelAxiosError()

	const value = {
		modelX: 390,
		modelY: 844,
		platform: Platform.OS,
		statusBarHeight: Constants.statusBarHeight,
		Quarter: 3 // enables or disables features for a particular quarter
	};
	const Stack = createNativeStackNavigator();

	const isPersistent = useSelector(getPersist);
	const refreshToken = useSelector(getRefresh);
	const policies = useSelector(getPolicies);
	const userAuthenticated = useSelector(getAuthStatus);
	const rememberMeTimeStamp = useSelector(getRememberMeTimestamp);
	const userId = useSelector(getUserId);
	const userTrn = useSelector(getTrn);
	const policyNumber = useSelector(getPolicyNumber);
	const plateNumber = useSelector(getPlateNumber);
	const customError = useSelector(getErrorModalCustomError);
	const isErrorModalVisible = useSelector(getIsErrorModalVisible);

	const navigationRef = useRef(null);
	const initialRender = useRef(true);
	const refreshIntervalContainer = useRef(); //holds the interval for refreshing the access token
	const expireAuthContainer = useRef(); //holds the timeout for expiring the user's authentication 
	const lastActiveTimestampRef = useRef(new Date())
	const rememberMeTimestampRef = useRef(null)

	const displayErrorModal = useDisplayErrorModal();

	const styles = StyleSheet.create({
		successToast: {
			backgroundColor: "rgba(16, 16, 20, 0.85)",
			shadowColor: "0px -4px 24px rgba(0, 0, 0, 0.15)",
			color: "#FFF",
			padding: 8,
			borderRadius: 16
		},
		claimsDlt: {
			backgroundColor: "rgba(16, 16, 20, 0.85)",
			shadowColor: "0px -4px 24px rgba(0, 0, 0, 0.15)",
			color: "#FFF",
			paddingHorizontal: 16,
			paddingVertical: 22,
			borderRadius: 16,
			width: "100%"
		},
		successCircle: {
			height: 12,
			width: 12,
			backgroundColor: "#10B981",
			borderRadius: 6

		},
		errorCircle: {
			height: 12,
			width: 12,
			backgroundColor: "#F87171",
			borderRadius: 8

		},
		warningCircle: {
			height: 12,
			width: 12,
			backgroundColor: "#FB923C",
			borderRadius: 8

		},
		claimsDeleteCircle: {
			height: 12,
			width: 12,
			borderRadius: 8,
			backgroundColor: "#FEC900"
		},
		textHeaderSuccessColor: {
			color: "#10B981",
			fontWeight: "700",
			paddingLeft: 8
		},
		textHeaderWarningColor: {
			color: "#FB923C",
			fontWeight: "700",
			paddingLeft: 8
		},
		textClaimsDelete: {
			color: "#FEC900",
			fontWeight: "700",
			paddingLeft: 8
		},
		textHeaderErrorColor: {
			color: "#F87171",
			fontWeight: "700",
			paddingLeft: 8
		},
		textColor: {
			color: "#FFFFFF",
			paddingLeft: 16

		}
	})

	/** This determines if the user is should be directed to the authenticated or unauthenticated flow */
	useEffect(() => {
		onAppLoad()
	}, []);

	/** Attach event handlers for changes in AppState */
	useEffect(() => {
		createAppStateListener(handleAppReactivation, handleAppDeactivation);
	}, [])

	/** Update last active date on initial render. This is to compensate for stale values persisting in state. */
	useEffect(() => {
		if (initialRender.current) {
			dispatch(rdxSetLastActive(new Date()))
			initialRender.current = false;
		}
	}, [])

	useEffect(() => {
		rememberMeTimestampRef.current = rememberMeTimeStamp;
	}, [rememberMeTimeStamp])

	useEffect(() => {
		if (navigationRef) navigationRef.current = getCurrentRouteName()
	})

	const onAppLoad = () => {
		try {
			if (isPersistent && getTimeElapsedSince(rememberMeTimeStamp) <= PERSISTENCE_WINDOW) {
				(async () => {
					if (refreshToken) {
						const { success, token: access_token } = await getAccessToken(refreshToken)
							.catch(err => {
								const { status } = err;
								if (status == 0) {
									displayErrorModal("network", onAppLoad, hideErrorModal);
								} else {
									displayErrorModal(status, onAppLoad, hideErrorModal);
								}
							}) ?? {};
						if (success == true) {
							console.log("Access token is here")
							const { policies, user } = await getUserAndPolicyData();
							console.log("Policy and user data is here")
							batch(() => {
								dispatch(rdxSetAccessToken(access_token));
								dispatch(rdxSetPolicies(policies));
								dispatch(rdxSetAuth(true));
								dispatch(rdxSetUser(user));
							});
							restartTokenRefreshment()
						} else {
							dispatch(rdxResetSession())
							deleteTokenRefreshInterval()
						}
					} else {
						dispatch(rdxResetSession())
						deleteTokenRefreshInterval()
					}
				})();
			} else {
				console.log("## Please authenticate")
				dispatch(rdxResetSession())
				deleteTokenRefreshInterval()
			}
		} catch (error) {
			console.error(error)
			dispatch(rdxResetSession())
		}
	}

	/** Set the user's status to inactive if no touch is detected for a period of time and
	 * 	warn them that their authentication will expire if they do not become active soon.
	 */
	const startUserActivityListener = useCallback(
		debounce(
			() => {
				console.log("You've been inactive")
				console.log("Are you persistent? ", isPersistent);
				if (!isPersistent && !evergreenScreens.includes(navigationRef.current)) {
					console.log("The countdown has started!")
					setUserActive(false);
					startAuthExpirationTimeout()
				} else {
					// do nothing
					console.log("...everything is okay because we remember you :)")
				}
			}
			, MAX_USER_INACTIVITY),
		[isPersistent]
	)

	const startAuthExpirationTimeout = () => {
		expireAuthContainer.current = createAuthExpirationTimeout(expireAuthentication, AUTH_WILL_EXPIRE_IN);
	}

	const stopAuthExpirationTimeout = () => {
		if (expireAuthContainer.current) {
			clearTimeout(expireAuthContainer.current);
		}
	}

	const expireAuthentication = () => {
		dispatch(rdxSetAccessToken(null));
		dispatch(rdxSetAuth(false));
		deleteTokenRefreshInterval();
		console.log("Your authentication has expired. Please sign in")
	}

	const updateAccessToken = async () => {
		console.log("I'm going to update the access token now");
		const { token: accessToken, success } = await getAccessToken(refreshToken);
		if (success) {
			dispatch(rdxSetAccessToken(accessToken));
			console.log("Access Token update: successful")
		}
	}

	const createTokenRefreshInterval = () => {
		const subscription = createInterval(updateAccessToken, ACCESS_TOKEN_REFRESH_INTERVAL)
		refreshIntervalContainer.current = subscription;
	}

	const deleteTokenRefreshInterval = () => {
		if (refreshIntervalContainer.current) clearInterval(refreshIntervalContainer.current);
	}

	const restartTokenRefreshment = () => {
		deleteTokenRefreshInterval()
		createTokenRefreshInterval()
	}

	const handleOnTouchStart = () => {
		if (userAuthenticated) {
			if (!userActive) {
				setUserActive(true);
				stopAuthExpirationTimeout();
			}
			startUserActivityListener();
		}
	}

	const handleAppDeactivation = () => {
		rdxSetLastActive(new Date());
		lastActiveTimestampRef.current = new Date();
	}

	const handleAppReactivation = () => {
		const timeElapsedSinceRememberMeSelected = getTimeElapsedSince(rememberMeTimestampRef.current);
		const timeElapsedSinceLastActive = getTimeElapsedSince(lastActiveTimestampRef.current)
		if (
			(userAuthenticated && isPersistent && timeElapsedSinceRememberMeSelected <= PERSISTENCE_WINDOW) ||
			(userAuthenticated && !isPersistent && timeElapsedSinceLastActive <= MAX_USER_INACTIVITY)
		) {
			console.log("You're lucky")
			restartTokenRefreshment()
		} else if (!userAuthenticated && timeElapsedSinceLastActive <= MAX_USER_INACTIVITY) {
			// do nothing
			console.log("No harm. No foul.")
		} else {
			console.log("Sorry. Your time is up! ")
			dispatch(rdxResetSession());
			deleteTokenRefreshInterval()
		}
	};

	const getCurrentRouteName = () => {
		return navigationRef.current.getCurrentRoute().name
	}

	const getUserAndPolicyData = async () => {
		const { data: { success, policies, user, error_message } } = await otherVerify(
			{
				id: userId,
				transaction: "renewal",
				trn: userTrn,
				policy_num: policyNumber,
				plate_num: plateNumber,
			}
		).catch(err => {
			handleTopLevelAxiosError(err, onAppLoad);
		});

		if (success) {
			const validPolicies = policies?.filter((pol) => !pol?.is_cancelled);
			return { policies: validPolicies, user };
		} else {
			console.error("There was an error generated while retrieving the user and policy data: ", error_message)
			throw new Error(error_message)
		}
	}

	const hideErrorModal = () => {
		console.log("Grey")
		dispatch(rdxSetIsErrorModalVisible(false))
	}

	return (
		<View
			style={{ flex: 1 }}
			onTouchStart={handleOnTouchStart}
		>
			<UserContext.Provider value={value}>
				<ToastProvider
					duration={10000}
					renderType={{
						success_type: (toast) => (
							<View style={styles.successToast}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={styles.successCircle}></View>
									<Text style={styles.textHeaderSuccessColor}>{toast.data}</Text>
								</View>
								<Text style={styles.textColor}>{toast.message}</Text>
							</View>
						),
						error_type: (toast) => (
							<View style={styles.successToast}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={styles.errorCircle}></View>
									<Text style={styles.textHeaderErrorColor}>{toast.data}</Text>
								</View>
								<Text style={styles.textColor}>{toast.message}</Text>
							</View>
						),
						warning_type: (toast) => (
							<View style={styles.successToast}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={styles.warningCircle}></View>
									<Text style={styles.textHeaderWarningColor}>{toast.data}</Text>
								</View>
								<Text style={styles.textColor}>{toast.message}</Text>
							</View>
						),
						claims_delete: (toast) => (
							<View style={styles.claimsDlt}>
								<View>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<View style={styles.claimsDeleteCircle}></View>
										<Text style={styles.textClaimsDelete}>{toast.data}</Text>
									</View>
									<Text style={styles.textColor}>{toast.message}</Text>
									{toast.timer}
								</View>
							</View>
						),

					}}
				>
					<NavigationContainer
						ref={ref => navigationRef.current = ref}
					>
						<Stack.Navigator
							initialRouteName="Initial"
							screenOptions={{
								headerShown: false,
								animation: "fade"
							}}
						>
							<Stack.Screen name="Initial">
								{() => <SplashSecondary to="Switch" />}
							</Stack.Screen>
							<Stack.Screen name="Switch">{() =>
								<Switch
									userActive={userActive}
									setUserActive={setUserActive}
									authenticated={userAuthenticated}
								/>}</Stack.Screen>
						</Stack.Navigator>
					</NavigationContainer>
				</ToastProvider>
				<BlankErrorModal visible={isErrorModalVisible} customError={customError} />
			</UserContext.Provider>
		</View>
	);
}

export default function Main(props) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={_store}>
				<PersistGate loading={null} persistor={_persistor}>
					<App {...props} />
				</PersistGate>
			</Provider>
		</GestureHandlerRootView>
	);
}
