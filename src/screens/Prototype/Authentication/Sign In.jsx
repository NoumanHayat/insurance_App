import React, { useState, useContext, useEffect, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Pressable,
	Keyboard,
	Platform
} from "react-native";
import { useDispatch, batch } from "react-redux";
import Animated, {
	SlideInDown,
	Easing,
	FadeOut,
	useSharedValue,
	withTiming,
	withDelay,
	useAnimatedStyle,
} from "react-native-reanimated";

import KeyboardAwareAppLayout from "../../../components/layouts/KeyboardAwareAppLayout";
import Logo from "../../../../assets/logo/logoWhiteLg.svg";
import InputDate from "../../../components/inputs/InputDate";
import InputGender from "../../../components/inputs/InputGender";
import CustomCheckbox from "../../../components/checkboxes/CustomCheckbox";
import LinGradBackground from "../../../components/backgrounds/LinGradBackground";
import {
	colour,
	fontSize,
	fontWeight,
	borderRadius,
} from "../../../styles/global";
import UserContext from "../../../context/context";
import {
	rdxSetUserId,
	rdxSetTrn,
	rdxSetGender,
	rdxSetFirstName,
	rdxSetMaskedSetPhoneNumbers
} from "../../../../store/v2/slices/user";
import { rdxSetPersist, rdxSetRememberMeTimestamp } from "../../../../store/v2/slices/session";
import { getShortDate } from "../../../lib/utils/formatters";
import InputTRN from "../../../components/inputs/InputTRN";
import X from "../../../../assets/wallet/x.svg"
import ContinueWithAnimation from "../../../components/buttons/ContinueWithAnimation";

import { capitalize } from "../../../lib/utils/formatters";
import AppLayout from "../../../components/layouts/AppLayout";
import { loginUser } from "../../../../network/auth"
import ScrollViewWithFade from "../../../components/scrollviews/ScrollViewWithFade";
import { useDisplayErrorModal, useHideErrorModal, useHandleTopLevelAxiosError } from "../../../lib/utils/hooks/error handling";

const SignIn = ({ navigation }) => {

	const { platform } = useContext(UserContext)

	return (
		<>
			{platform == "ios" ? (
				<KeyboardAwareAppLayout behavior="position" >
					<Content navigation={navigation} />
				</KeyboardAwareAppLayout>)
				: (
					<AppLayout>
						<Content navigation={navigation} />
					</AppLayout>
				)
			}
		</>
	);
};

export default SignIn;

const Content = ({ navigation }) => {

	const [dob, setDob] = useState(new Date("01/01/1997"));
	const [gender, setGender] = useState("");
	const [trn, setTrn] = useState("");
	const [isAllDataEntered, setIsAllDataEntered] = useState(false); //are all fields populated?
	const [rememberMe, setRememberMe] = useState(false);
	const [signinPressed, setSigninPressed] = useState(false);
	const [isTrnValid, setIsTrnValid] = useState(false);

	const displayErrorModal = useDisplayErrorModal();
	const hideErrorModal = useHideErrorModal();
	const handleTopLevelAxiosError = useHandleTopLevelAxiosError()

	const states = useMemo(() => [dob, gender, trn],[dob, gender, trn]);
	const platform = Platform.OS;

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } =
		useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const dispatch = useDispatch();
	const popupTextShared = useSharedValue(0);
	const logoShared = useSharedValue(1);
	const logoSectionSV = useSharedValue(340);

	const popupStyles = useAnimatedStyle(() => {
		return {
			opacity: popupTextShared.value,
		};
	});

	const logoStyles = useAnimatedStyle(() => {
		return {
			opacity: logoShared.value,
		};
	});

	const logoSectionStyles = useAnimatedStyle(() => ({
		height: logoSectionSV.value * ratioY
	}))

	const styles = StyleSheet.create({
		page: {
			backgroundColor: "#1F2937",
			flex: 1,
		},
		innerPage: {
			flex: 1,
		},
		logoSection: {
			height: 340 * ratioY, // Originally 318
			borderBottomLeftRadius: 25,
			borderBottomRightRadius: 25,
			justifyContent: "center",
			overflow: "hidden"
		},
		logo: {
			height: 171 * ratioY,
			width: 257 * ratioX,
		},
		heading: {
			fontWeight: platform === "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: 24 * ratioY,
			lineHeight: 28.13 * ratioY,
			color: "#fff",
		},
		inputsContainer: {
			alignItems: "center",
			justifyContent: "space-between",
			marginTop: 32 * ratioY,
			flex: 1,
			width: "100%",
			paddingHorizontal: 24 * ratioX,
		},
		scrollView: {
			width: "100%",
		},
		inputs: {
			width: "100%",
			alignItems: "flex-start",
			flex: 1
		},
		input1: {
			marginTop: 20 * ratioY,
			width: "100%"
		},
		input23: {
			marginTop: 24 * ratioY,
			borderWidth: 1,
			width: "100%",
			borderColor: colour["colour-border-input-default"],
			borderRadius: borderRadius["border-radius-3"],
		},
		checkbox: {
			marginTop: 24 * ratioY,
			flexDirection: "row",
			alignItems: "center",
		},
		rememberMe: {
			marginLeft: 12 * ratioX,
			fontSize: fontSize["font-size-3"] * ratioY,
			lineHeight: 18.75,
			color: "#fff",
			fontWeight: "400",
		},
		continue: {
			width: "100%",
			paddingBottom: 32 * ratioY,
			paddingTop: 15 * ratioY
		},
		popupContainer: {
			marginTop: platform == "ios" ? 290 * ratioY : undefined,
			top: platform == "android" ? "5%" : undefined,
			width: "100%",
			position: "absolute",
			flexDirection: "row",
			justifyContent: "space-between",
			paddingHorizontal: 40 * ratioX,
		},
		popupTextContainer: {
			height: 32 * ratioY,
			paddingVertical: 6 * ratioY,
			paddingHorizontal: 10 * ratioY,
			borderRadius: 6 * ratioY,
			backgroundColor: "#013A8A",
		},
		popupText: {
			color: "#fff",
			fontSize: 16 * ratioY,
			lineHeight: 18.75 * ratioY,
		},
		popupX: {
			height: 32 * ratioY,
			width: 32 * ratioX
		},
	});

	/** Check validity of inputs */
	useEffect(() => {
		if (
			states.every((value) => value !== undefined && value !== "") &&
			isTrnValid == true &&
			trn.length == 9
		) {
			setIsAllDataEntered(true);
		} else {
			setIsAllDataEntered(false);
		}
	},[states,isTrnValid, trn?.length]);

	/** Add Keyboard event handlers for Android to make the screen adjust accordingly.*/
	useEffect(() => {
		if (platform == "android") {
			Keyboard.addListener("keyboardDidShow", contractLogoSection);
			Keyboard.addListener("keyboardDidHide", expandLogoSection);

			return () => {
				Keyboard.removeListener("keyboardDidShow", contractLogoSection);
				Keyboard.removeListener("keyboardDidHide", expandLogoSection);
			}
		}
	}, [])


	const contractLogoSection = () => {
		logoSectionSV.value = withTiming(88)
	};

	const expandLogoSection = () => {
		logoSectionSV.value = withTiming(340)
	}

	const revealPopup = () => {
		popupTextShared.value = withDelay(1000, withTiming(1));
		logoShared.value = withTiming(0);
	};

	const hidePopup = () => {
		popupTextShared.value = 0;
		logoShared.value = withTiming(1);
	};

	const signIn = async () => {
		try {
			setSigninPressed(true);

			const { success, first_name, id, phone_numbers } = await getContactMethods() ?? {};

			if (success) {
				const maskedPhoneNumbers = getMaskedPhoneNumbers(phone_numbers);
				batch(() => {
					if (rememberMe) {
						dispatch(rdxSetRememberMeTimestamp(new Date()))
						//revisit this when reimplementing the persistent login
						// dispatch(rdxSetPersist(true));
					} else {
						dispatch(rdxSetPersist(false));
					}
					dispatch(rdxSetTrn(trn));
					dispatch(rdxSetUserId(id));
					dispatch(rdxSetMaskedSetPhoneNumbers(maskedPhoneNumbers));
					dispatch(rdxSetGender(capitalize(gender)));
					dispatch(rdxSetFirstName(first_name));
				});
				navigation.navigate("VerificationOptions");
			}
		} catch (e) {
			console.error("An error occurred while attempting to sign in :", e)
			displayErrorModal("generic", signIn, hideErrorModal)
		} finally {
			setSigninPressed(false);
		}
	};

	const getContactMethods = async () => {
		const dobFormatted = getShortDate(dob);

		return loginUser({ trn, gender, dob: dobFormatted }).catch((err) => {
			const blueBtnCallback = () => { signIn(); hideErrorModal() };
			handleTopLevelAxiosError(err, blueBtnCallback);
		});
	}

	const getMaskedPhoneNumbers = (phoneNumberArray) => {
		const numbers = [];
		phoneNumberArray?.forEach((obj) => {
			if (obj?.use_for_sms) {
				numbers.push(obj.value);
			}
		});
		return numbers;
	};


	return (
		<Animated.View
			entering={SlideInDown.duration(250).easing(Easing.in)}
			exiting={FadeOut.duration(450).easing(Easing.out).delay(1450)}
			style={styles.page}
		>
			<Pressable style={styles.innerPage} onPress={Keyboard.dismiss}>
				{platform == "android" ? (
					<Animated.View style={[styles.logoSection, logoSectionStyles]}>
						<LinGradBackground borderBottomEndRadius={12} justify>
							<Animated.View style={[styles.logo, logoStyles]}>
								<Logo />
							</Animated.View>
						</LinGradBackground>
					</Animated.View>
				) : (
					<View style={styles.logoSection}>
						<LinGradBackground borderBottomEndRadius={12} justify>
							<Animated.View style={[styles.logo, logoStyles]}>
								<Logo />
							</Animated.View>
						</LinGradBackground>
					</View>
				)
				}
				<View style={styles.inputsContainer}>
					<ScrollViewWithFade pageColor={styles.page.backgroundColor} fadeHeight={30 * ratioY}>
						<View style={styles.inputs}>
							<Text style={[styles.heading, styles.iosHeading]}>Sign in</Text>
							<View style={styles.input1}>
								<InputTRN
									hidePopup={hidePopup}
									onFocus={revealPopup}
									valid={isTrnValid}
									setValid={setIsTrnValid}
									editable
									value={trn}
									setValue={setTrn}
									pageColour={styles.page.backgroundColor}
								/>
							</View>
							<View style={styles.input23}>
								<InputDate
									date={dob}
									setDate={setDob}
									pageColour={styles.page.backgroundColor}
									dob={true}
								/>
							</View>
							<View style={styles.input23}>
								<InputGender
									gender={gender}
									setGender={setGender}
									pageColour={styles.page.backgroundColor}
								/>
							</View>
							<View
								style={styles.checkbox}
							>
								<CustomCheckbox
									setChecked={setRememberMe}
									pageColour={styles.page.backgroundColor}
								/>
								<Text style={styles.rememberMe}>Remember me</Text>
							</View>
						</View>
					</ScrollViewWithFade>

					<Pressable
						disabled={!isAllDataEntered}
						style={styles.continue}
						onPress={signIn}>
						<ContinueWithAnimation
							disabled={!isAllDataEntered}
							pressed={signinPressed}
						/>
					</Pressable>
				</View>

				{/* Forgot password */}
				<Animated.View style={[styles.popupContainer, popupStyles]}>
					<Pressable
						onPress={() => {
							Keyboard.dismiss();
							hidePopup();
						}}>
						<X height={styles.popupX.height} width={styles.popupX.width} />
					</Pressable>
					<Pressable style={styles.popupTextContainer}>
						<Text style={styles.popupText}>Forgot password?</Text>
					</Pressable>
				</Animated.View>
			</Pressable >
		</Animated.View >
	)
}
