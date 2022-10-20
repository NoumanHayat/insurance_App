import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Pressable,
	Keyboard,
} from "react-native";
import { useSelector, useDispatch, batch } from "react-redux";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import KeyboardAwareAppLayout from "../../../components/layouts/KeyboardAwareAppLayout";
import CustomRadioButton from "../../../components/buttons/CustomRadioButton";
import VerificationOption from "../../../components/misc/VerificationOption";
import InputText from "../../../components/inputs/InputText";
import {
	getUserId,
	getTrn,
	getFirstName,
	rdxSetName,
	rdxSetEmail,
	rdxSetPhoneNumbers,
	getMaskedPhoneNumbers,
	rdxSetPolicyNumber,
	rdxSetPlateNumber
} from "../../../../store/v2/slices/user";
import { rdxSetUser } from "../../../../store/v2/slices/userNotPersisted";
import { rdxSetPolicies, rdxSetToastNotif } from "../../../../store/v2/slices/policies";
import {
	rdxSetClass,
	rdxSetDateIss,
	rdxSetDateExp,
} from "../../../../store/v2/slices/license";
import {
	rdxSetAccessToken,
	rdxSetAuth,
	rdxSetRefresh,
} from "../../../../store/v2/slices/session";
import { rdxSetIsErrorModalVisible } from "../../../../store/v2/slices/errorModal";
import {
	fontWeight,
} from "../../../styles/global";
import UserContext from "../../../context/context";
import InputLicence from "../../../components/inputs/InputLicence";
import ContinueWithAnimation from "../../../components/buttons/ContinueWithAnimation";
import OTPInput from "../../../components/inputs/OTPInput";
import Back from "../../../components/buttons/Backv2";
import { otherVerify, verifyOtp, requestOtp } from "../../../../network/auth";
import ScrollViewWithFade from "../../../components/scrollviews/ScrollViewWithFade";
import { useHandleTopLevelAxiosError, useDisplayErrorModal } from "../../../lib/utils/hooks/error handling";

const VerificationOptions = ({ navigation }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	/** For first screen presenting verification options */
	const [selected, setSelected] = useState(undefined); // which of the options are selected. Integers signify phone numbers, other signifies verification via policy and TRN numbers.
	const [policy, setPolicy] = useState("");
	const [license, setLicense] = useState("");
	const [continuePressed, setContinuePressed] = useState(false);
	const [areOtherCredentialsValid, setAreOtherCredentialsValid] = useState(false); //are all fields populated for 'other' verification?
	const [isLicensePlateValid, setIsLicensePlateValid] = useState(false);
	const [isPolicyValid, setIsPolicyValid] = useState(true);
	const [index, setIndex] = useState(0);

	/** For second screen presenting OTP inputs */
	const [one, setOne] = useState();
	const [two, setTwo] = useState();
	const [three, setThree] = useState();
	const [four, setFour] = useState();
	const [five, setFive] = useState();
	const [six, setSix] = useState();

	const [oneValid, setOneValid] = useState(true);
	const [twoValid, setTwoValid] = useState(true);
	const [threeValid, setThreeValid] = useState(true);
	const [fourValid, setFourValid] = useState(true);
	const [fiveValid, setFiveValid] = useState(true);
	const [sixValid, setSixValid] = useState(true);

	const [isOTPasswordValid, setIsOTPasswordValid] = useState(false);

	/** General state */
	// eslint-disable-next-line
	const [hidden, setHidden] = useState(true); // whether button displaying OTP received from SMS is visible or not.

	const handleTopLevelAxiosError = useHandleTopLevelAxiosError()

	/** For 'SMS' verification option */
	const oneRef = useRef();
	const twoRef = useRef();
	const threeRef = useRef();
	const fourRef = useRef();
	const fiveRef = useRef();
	const sixRef = useRef();

	const OTPstates = useMemo(() => [one, two, three, four, five, six], [one, two, three, four, five, six]);
	const setOTPStates = [setOne, setTwo, setThree, setFour, setFive, setSix];
	const OTPvalids = useMemo(() => [
		oneValid,
		twoValid,
		threeValid,
		fourValid,
		fiveValid,
		sixValid,
	], [oneValid, twoValid, threeValid, fourValid, fiveValid, sixValid]);
	const setOTPValids = [
		setOneValid,
		setTwoValid,
		setThreeValid,
		setFourValid,
		setFiveValid,
		setSixValid,
	];
	const OTPrefs = [oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef];

	const inputs = OTPstates.map((_, index) => (
		<OTPInput
			key={index}
			index={index}
			innerRef={OTPrefs[index]}
			refs={OTPrefs}
			state={OTPstates[index]}
			setState={setOTPStates[index]}
			valid={OTPvalids[index]}
			setValid={setOTPValids[index]}
		/>
	));

	const dispatch = useDispatch();
	const displayErrorModal = useDisplayErrorModal();

	const phoneNumbers = useSelector(getMaskedPhoneNumbers);
	const userId = useSelector(getUserId);
	const userTrn = useSelector(getTrn);
	const userFirstname = useSelector(getFirstName);

	const styles = StyleSheet.create({
		page: {
			paddingTop: Math.round(45 * ratioY),
			backgroundColor: "#1F2937",
			flex: 1,
			paddingHorizontal: 24 * ratioX,
		},
		innerPage: {
			flex: 1,
			justifyContent: "space-between",
		},
		headingGroup: {
			flexDirection: "row",
			zIndex: 2,
			marginBottom: 10,
		},
		heading: {
			fontWeight: fontWeight["font-weight-1"],
			fontSize: 32 * ratioY,
			lineHeight: 37.5 * ratioY,
			color: "#fff",
		},
		prompt: {
			fontWeight: fontWeight["font-weight-1"],
			fontSize: 20 * ratioY,
			lineHeight: 23.44 * ratioY,
			color: "#FFD53D",
			marginTop: 8 * ratioY,
		},
		buttons: {
			// backgroundColor: "#1F2937",
			zIndex: 2,
			width: "100%",
			paddingBottom: 32 * ratioY
		},
		continue: {
			// marginTop: 24 * ratioY, // to un-comment when using the 'Tap to add ...' button"
			marginTop: 15 * ratioY
		},
		options: {
			marginTop: 48 * ratioY,
			width: 2 * width - (24 * ratioX),
		},
		option: {
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center",
		},
		option2: {
			marginTop: 24 * ratioY,
		},
		alternateInput: {
			marginTop: 24 * ratioY,
		},
		inputs: {
			borderColor: "#fff",
			borderWidth: 1,
			position: "absolute",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			top: 157 * ratioY,
			width: "100%",
		},
		_inputs: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		_SMS: {
			width: (width - 24 * ratioX)
		},
		_OTP: {
			width: (width - 24 * ratioX),
			paddingLeft: 24 * ratioX
		},
		pLHidden: {
			opacity: 0,
		},
		pLVisible: {
			opacity: 1,
		},
		back: {
			marginRight: 16 * ratioX,
		},
		modalView: {
			height,
			width,
			justifyContent: "center",
			alignItems: "center",
		},
		innerModal: {
			backgroundColor: "#fff",
			padding: 50,
			borderRadius: 6,
		},
		modalCancel: {
			position: "absolute",
			top: 8,
			right: 8,
			height: 30,
			width: 30,
			borderColor: "#000",
			borderWidth: 1,
			borderRadius: 15,
			alignItems: "center",
			padding: 2,
		},
		modalX: { height: 20, lineHeight: 20 },
	});

	const OTPSV = useSharedValue(width);
	const optionsSV = useSharedValue(0);

	const optionsStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: optionsSV.value }],
		};
	});

	/** Hide keyboard on initial render */
	useEffect(() => {
		Keyboard.dismiss();
	}, []);

	/** Checking validity of license plate number and policy number entered */
	useEffect(() => {
		/** For 'other' verification option */
		const otherStates = [policy, license];
		const otherValids = [isLicensePlateValid, isPolicyValid];
		if (selected == 0) {
			setAreOtherCredentialsValid(false);
		} else {
			if (
				otherStates.every((value) => value !== undefined && value !== "") &&
				otherValids.every((valid) => valid == true)
			) {
				setAreOtherCredentialsValid(true);
			} else {
				setAreOtherCredentialsValid(false);
			}
		}
	}, [isPolicyValid, isLicensePlateValid, selected, license, policy]);

	/** Checking validity of OTP entered */
	useEffect(() => {
		if (
			OTPstates.every(
				(value) =>
					value !== undefined &&
					value !== ""
			) &&
			OTPvalids.every((valid) => valid == true)
		) {
			setIsOTPasswordValid(true);
		} else {
			setIsOTPasswordValid(false);
		}
	}, [OTPstates, OTPvalids]);

	/** If the user presses the hardware back-button on the screen showing the OTP inputs,
	 * 	then the app will navigate back to the screen presenting the verification options instead
	 * 	of navigating back to the Sign In screen.
	 */
	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			if (index == 1) {
				e.preventDefault();
				showVerificationOptions();
				hideOTPInputs();
				setIndex(0);
			}
		});
	});

	const hideVerificationOptions = () => {
		optionsSV.value = withTiming(-width, { duration: 500 });
	};

	const showVerificationOptions = () => {
		optionsSV.value = withTiming(0, { duration: 500 });
	};

	const showOTPInputs = () => {
		OTPSV.value = withTiming(0, { duration: 500 });
	};

	const hideOTPInputs = () => {
		OTPSV.value = withTiming(width, { duration: 500 });
	};

	const hideErrorModal = () => {
		dispatch(rdxSetIsErrorModalVisible(false))
	}

	const handleContinuePressed = async () => {
		try {
			setContinuePressed(true);
			// Case: User has selected 'SMS' verification option and has entered legal values for the inputs
			if (selected != "other" && isOTPasswordValid) {

				const { data: { success, user, policies, token, refreshToken } } = await verifyOtp({
					trn: userTrn,
					id: userId,
					transaction: "renewal",
					otp: OTPstates.join(""),
				}).catch((err) => {
					handleTopLevelAxiosError(err, blueBtnCallback)
				}) ?? {};

				if (success) {

					const {
						drivers_licence_date_issued: dateIss,
						drivers_licence_expiry_date: dateExp,
						drivers_licence_type: licenceClass,
						first_name: firstName,
						last_name: lastName,
						email_address: _email,
						phone_numbers,
					} = user;

					const validPolicies = policies?.filter((pol) => !pol.is_cancelled);
					const policyNumber = validPolicies[0]?.policy_number;
					const plateNumber = validPolicies[0]?.risks[0]?.registration_number;

					batch(() => {
						dispatch(rdxSetAccessToken(token));
						dispatch(rdxSetRefresh(refreshToken));
						dispatch(rdxSetDateIss(dateIss));
						dispatch(rdxSetDateExp(dateExp));
						dispatch(rdxSetClass(licenceClass));
						dispatch(rdxSetName(firstName + " " + lastName));
						dispatch(rdxSetUser(user));
						dispatch(rdxSetPolicies(validPolicies));
						dispatch(rdxSetEmail(_email));
						dispatch(rdxSetPhoneNumbers(phone_numbers));
						dispatch(rdxSetAuth(true));
						dispatch(rdxSetPolicyNumber(policyNumber));
						dispatch(rdxSetPlateNumber(plateNumber));
					});
					navigation.navigate("Verifying");
				} else {
					// displayErrorModal(responseStatus, blueBtnCallback, hideErrorModal)
				}
				// Case: User has selected 'other' verification option and has entered legal values for the policy and license
			} else if (selected == "other" && areOtherCredentialsValid) {
				const { data: { success, user, policies, token, refreshToken, error_message } } = await otherVerify(
					{
						id: userId,
						transaction: "renewal",
						trn: userTrn,
						policy_num: policy,
						plate_num: license,
					}
				)
					.catch(err => {
						handleTopLevelAxiosError(err, blueBtnCallback)
					}) ?? {};

				if (success === true) {

					const {
						drivers_licence_date_issued: dateIss,
						drivers_licence_expiry_date: dateExp,
						drivers_licence_type: licenceClass,
						first_name: firstName,
						last_name: lastName,
						email_address: _email,
						phone_numbers,
					} = user;

					const validPolicies = policies.filter((pol) => !pol.is_cancelled);

					batch(() => {
						dispatch(rdxSetAccessToken(token));
						dispatch(rdxSetRefresh(refreshToken));
						dispatch(rdxSetDateIss(dateIss));
						dispatch(rdxSetDateExp(dateExp));
						dispatch(rdxSetClass(licenceClass));
						dispatch(rdxSetName(firstName + " " + lastName));
						dispatch(rdxSetUser(user));
						dispatch(rdxSetPolicies(validPolicies));
						dispatch(rdxSetEmail(_email));
						dispatch(rdxSetPhoneNumbers(phone_numbers));
						dispatch(rdxSetAuth(true));
						dispatch(rdxSetPolicyNumber(policy));
						dispatch(rdxSetPlateNumber(license));
					});
					navigation.navigate("Verifying");
				} else {
					console.log("Verification failed");
					console.log("error_message ", error_message)
				}
				// Case: User has opted to use 'SMS' verification option, but hasn't yet entered legal values for the inputs
			} else if (selected != "other") {
				console.log("Requesting otp");
				requestOtp({
					customer: userFirstname,
					trn: userTrn,
					id: userId,
					phone: phoneNumbers[selected],
				}).then(({ data: { success } }) => {
					if (success) {
						setIndex(1); // on page with OTP inputs
						hideVerificationOptions();
						showOTPInputs();
						setHidden(false);
						console.log("OTP Requested");
					} else {
						displayErrorModal(400, blueBtnCallback, hideErrorModal)
						console.log("OTP verification failed");
					}
				}).catch(err => {
					handleTopLevelAxiosError(err, blueBtnCallback);
				})
			}
		} catch (error) {
			console.error(error);
		} finally {
			setContinuePressed(false);
		}
	}

	const blueBtnCallback = () => {
		handleContinuePressed();
		hideErrorModal();
	}

	return (
		<KeyboardAwareAppLayout
			behavior={platform == "ios" && "padding"}
		>
			<Pressable onPress={() => Keyboard.dismiss()} style={styles.page}>
				{/* Heading Group */}
				<View style={styles.headingGroup}>
					<Pressable
						disabled={selected == undefined}
						onPress={() => navigation.goBack()}
						style={styles.back}>
						<Back
							// disabled={selected == undefined}
							disabled={!(index == 1 && selected != "other")}
						/>
					</Pressable>
					<View>
						<Text style={styles.heading}>Hello,</Text>
						<Text style={styles.prompt}>Please verify your identity</Text>
					</View>
				</View>
				<View style={styles.innerPage}>
					<ScrollViewWithFade fadeHeight={30 * ratioY} pageColor={styles.page.backgroundColor}>
						{/* Verificiation Options */}
						<Animated.View style={[styles.options, optionsStyles, { flexDirection: "row" }]}>
							{/* SMS & 'Other' */}
							<View style={styles._SMS}>
								{phoneNumbers &&
									phoneNumbers.map((number, index) => {
										return (
											<Pressable
												key={index}
												style={[styles.option, index != 0 && styles.option2]}
												onPress={() => setSelected(index)}>
												<CustomRadioButton
													pageColour="#1F2937"
													value={index}
													selected={selected}
													setSelected={setSelected}
												/>
												<VerificationOption
													value={index}
													selected={selected}
													text={number}
												/>
											</Pressable>
										);
									})}
								<Pressable
									style={[styles.option, styles.option2]}
									onPress={() => setSelected("other")}>
									<CustomRadioButton
										pageColour="#1F2937"
										value={"other"}
										selected={selected}
										setSelected={setSelected}
									/>
									<VerificationOption
										value={"other"}
										selected={selected}
										text="Other"
									/>
								</Pressable>

								{/* 'Other' Verification Inputs*/}
								<View
									style={[
										styles.pLHidden,
										selected == "other" && styles.pLVisible,
										{ paddingBottom: 30 * ratioY }
									]}>
									<View style={styles.alternateInput}>
										<InputText
											editable
											valid={isPolicyValid}
											setValid={setIsPolicyValid}
											setExtracted={setPolicy}
											placeholder="Policy Number"
											pageColour={styles.page.backgroundColor}
											keyboardType="default"
										/>
									</View>
									<View style={styles.alternateInput}>
										<InputLicence
											editable
											setExtracted={setLicense}
											placeholder="License Plate Number"
											pageColour={styles.page.backgroundColor}
											keyboardType="default"
											valid={isLicensePlateValid}
											setValid={setIsLicensePlateValid}
										/>
									</View>
								</View>
							</View>
							{/* One time password */}
							<View style={styles._OTP}>
								<View style={styles._inputs}>
									{inputs.map((input) => input)}
								</View>
							</View>
						</Animated.View>
					</ScrollViewWithFade>

					<View style={styles.buttons}>

						{/* DON'T DELETE -- TO BE RE-INTEGRATED IN THE FUTURE */}

						{/* <Pressable onPress={() => setHidden(true)}>
						{!hidden && (
							<TextButtonX
								text='Tap to add "356910"'
								textColor="#fff"
								fontSize={fontSize["font-size-5"]}
								backgroundColor="#2565BF"
								borderRadius={6}
								height={48}
							/>
						)}
					</Pressable> */}
						<Pressable
							disabled={
								!(index == 0 && selected == "other" && areOtherCredentialsValid) &&
								!(index == 0 && selected != "other" && !isOTPasswordValid) &&
								!(index == 1 && selected != "other" && isOTPasswordValid)
							}
							style={styles.continue}
							onPress={handleContinuePressed}
						>
							<ContinueWithAnimation
								disabled={
									!(index == 0 && selected == "other" && areOtherCredentialsValid) &&
									!(index == 0 && selected != "other" && !isOTPasswordValid) &&
									!(index == 1 && selected != "other" && isOTPasswordValid) ||
									selected == undefined
								}
								pressed={continuePressed}
							/>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</KeyboardAwareAppLayout>
	);
};

export default VerificationOptions;
