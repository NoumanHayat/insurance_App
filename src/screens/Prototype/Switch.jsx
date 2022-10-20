import React, { useEffect, useRef, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

/** Q1 Screens */

//eslint-disable-next-line
import FirstLaunch from "./Splash Screens/Splash Screen - First Launch";
import Features from "./Onboarding (Features)/index";
import SignIn from "./Authentication/Sign In";
import SplashSecondary from "./Splash Screens/Splash Screen - Secondary";
import VerificationOptions from "./Authentication/VerificationOptions";
import Profile from "./Wallet/Profile";
import MyWallet from "./Wallet/MyWallet";
import Policy from "./Policy/Policy";
import PolicyLanding from "./Policy/PolicyLanding";
import ViewPDF from "../../components/viewPdf/ViewPDF";
import Verifying from "./Animated Transitions/Verifying";
import DWOnly from "./Onboarding (Features)/DigitalWalletOnly";


/** Q2 Screens */

import SketchPad from "../../components/misc/Sketchpad";
import RenewPolicy from "./Renewals/RenewPolicy/RenewPolicy";
import ConfirmRenewal from "./Renewals/RenewPolicy/ConfirmRenewal"
import PayPremium from "./Renewals/PayPremium/PayPremium";
import PayBalance from "./Renewals/PayPremium/PayBalance";

/** Everything else */

import UserContext from "../../context/context";
import ExpirationWarningModal from "../../components/modals/ExpirationWarningModal";
import { AUTH_WILL_EXPIRE_IN, PERSISTENCE_WINDOW } from "../../lib/session/CONSTANTS";
import { getTimeElapsedSince } from "../../lib/session/general";
import { getPersist, getRememberMeTimestamp } from "../../../store/v2/slices/session";
import SuccessfulPayment from "./Animated Transitions/SuccessfulPayment";
import SuccessfulPremiumPayment from "./Animated Transitions/SuccessfulPremiumPayment";
import { withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/error handling/ScreenErrorFallback";
import RecentClaims from "./Claim/RecentClaims";
import CollisionClaim from "./Claim/ClaimTypes/CollisionClaim";
import ClaimSaved from "./Animated Transitions/Claims/ClaimSaved";

const MyWalletWithEB = withErrorBoundary(MyWallet, { FallbackComponent: ErrorFallback });
const ProfileWithEB = withErrorBoundary(Profile, { FallbackComponent: ErrorFallback });
const PolicyWithEB = withErrorBoundary(Policy, { FallbackComponent: ErrorFallback });
const PolicyLandingWithEB = withErrorBoundary(PolicyLanding, { FallbackComponent: ErrorFallback });
const RenewPolicyWithEB = withErrorBoundary(RenewPolicy, { FallbackComponent: ErrorFallback });
const ConfirmRenewalWithEB = withErrorBoundary(ConfirmRenewal, { FallbackComponent: ErrorFallback });
const PayPremiumWithEB = withErrorBoundary(PayPremium, { FallbackComponent: ErrorFallback })
const PayBalanceWithEB = withErrorBoundary(PayBalance, { FallbackComponent: ErrorFallback })

const Switch = ({ authenticated, userActive, setUserActive }) => {


	const Stack = createNativeStackNavigator();
	const navigation = useNavigation();
	const { Quarter } = useContext(UserContext);

	const isPersistent = useSelector(getPersist);
	const rememberMeTimeStamp = useSelector(getRememberMeTimestamp);

	const authExpiredNavTimeoutContainer = useRef();
	const initialRender = useRef(true);

	/** If the user is inactive after receiving a warning, then the app will navigate to the Sign In screen
	 * 	This will happen when either: 
	 * 	(i) The user's authentication is not persistent (they did not select 'remember me') and they 
	 * 	have been inactive for too long or,
	 * 	(ii) The user's authentication is persistent but the persistence window has expired.
	 */
	useEffect(() => {
		let subscription
		if (
			(!userActive && authenticated && !isPersistent) ||
			(!userActive && authenticated && isPersistent && getTimeElapsedSince(rememberMeTimeStamp) >= PERSISTENCE_WINDOW)
		) {
			console.log("Timeout starting now");
			subscription = setTimeout(() => {
				navigation.navigate("SignIn");
				setUserActive(true); //to close modal
			}, AUTH_WILL_EXPIRE_IN);
			authExpiredNavTimeoutContainer.current = subscription
		} else {
			// User is active again.
			clearTimeout(authExpiredNavTimeoutContainer.current);
		}
		return () => {
			clearTimeout(authExpiredNavTimeoutContainer.current);
		}
	}, [userActive])

	useEffect(() => {
		if (!initialRender.current && !authenticated) {
			console.log("Signing out now")
			navigation.navigate("SignIn")
		} else {
			initialRender.current = false;
		}
	}, [authenticated])



	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: "fade"
				}}
				initialRouteName={authenticated ? "WalletLanding" : "FirstLaunch"}

			>
				{authenticated && isPersistent ? (
					<>

						{Quarter == 0 && <Stack.Screen name="Sketch" component={SketchPad} />}

						{/* Q1 */}
						{Quarter >= 1 &&
							<>
								<Stack.Screen name="Features" component={Features} />
								<Stack.Screen name="SignIn" component={SignIn} />
								<Stack.Screen name="SplashSecondary">
									{() => <SplashSecondary to="VerificationOptions" />}
								</Stack.Screen>
								<Stack.Screen
									name="VerificationOptions"
									component={VerificationOptions}
								/>
								<Stack.Screen name="Verifying" component={Verifying} />
								<Stack.Screen name="DWOnly" component={DWOnly} />
								<Stack.Screen name="WalletLanding" component={MyWalletWithEB} />
								<Stack.Screen name="MyPortfolio" component={ProfileWithEB} />
								<Stack.Screen name="Policy" component={PolicyWithEB} />
								<Stack.Screen name="PolicyLanding" component={PolicyLandingWithEB} />
								<Stack.Screen name="ViewPDF" component={ViewPDF} />
							</>

						}

						{/* Q2 */}

						{
							Quarter >= 2 &&
							<>
								<Stack.Screen name="RenewPolicy" component={RenewPolicyWithEB} />
								<Stack.Screen name="ConfirmRenewal" component={ConfirmRenewalWithEB} />
								<Stack.Screen name="SuccessfulPayment" component={SuccessfulPayment} />
								<Stack.Screen name="SuccessfulPremiumPayment" component={SuccessfulPremiumPayment} />
								<Stack.Screen name="PayPremium" component={PayPremiumWithEB} />
								<Stack.Screen name="PayBalance" component={PayBalanceWithEB} />
							</>
						}

						{/* Q3 */}

						{
							Quarter >= 3 &&
							<>
								<Stack.Screen name="RecentClaims" component={RecentClaims} />
								<Stack.Screen name="CollisionClaim" component={CollisionClaim} />
								<Stack.Screen name="ClaimSaved" component={ClaimSaved} />
							</>
						}



					</>
				) : (
					<>

						{Quarter == 0 && <Stack.Screen name="Sketch" component={SketchPad} />}

						{/* Q1 */}
						{Quarter >= 1 &&
							<>
								<Stack.Screen name="FirstLaunch" component={FirstLaunch} />
								<Stack.Screen name="Features" component={Features} />
								<Stack.Screen name="SignIn" component={SignIn} />
								<Stack.Screen name="SplashSecondary">
									{() => <SplashSecondary to="VerificationOptions" />}
								</Stack.Screen>
								<Stack.Screen
									name="VerificationOptions"
									component={VerificationOptions}
								/>
								<Stack.Screen name="Verifying" component={Verifying} />
								<Stack.Screen name="DWOnly" component={DWOnly} />
								<Stack.Screen name="WalletLanding" component={MyWalletWithEB} />
								<Stack.Screen name="MyPortfolio" component={ProfileWithEB} />
								<Stack.Screen name="Policy" component={PolicyWithEB} />
								<Stack.Screen name="PolicyLanding" component={PolicyLandingWithEB} />
								<Stack.Screen name="ViewPDF" component={ViewPDF} />
							</>
						}

						{/* Q2 */}
						{
							Quarter >= 2 &&
							<>
								<Stack.Screen name="RenewPolicy" component={RenewPolicyWithEB} />
								<Stack.Screen name="ConfirmRenewal" component={ConfirmRenewalWithEB} />
								<Stack.Screen name="SuccessfulPayment" component={SuccessfulPayment} />
								<Stack.Screen name="PayPremium" component={PayPremiumWithEB} />
								<Stack.Screen name="PayBalance" component={PayBalanceWithEB} />
							</>
						}
						{/* Q3 */}

						{
							Quarter >= 3 &&
							<>
								<Stack.Screen name="RecentClaims" component={RecentClaims} />
								<Stack.Screen name="CollisionClaim" component={CollisionClaim} />
								<Stack.Screen name="ClaimSaved" component={ClaimSaved} />
							</>
						}

					</>
				)}
			</Stack.Navigator>
			<ExpirationWarningModal visible={!userActive && !isPersistent} />
		</>
	);
};

export default Switch;
