import React, { useContext, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Pressable,
	Modal,
	Keyboard,
	ScrollView,
	TouchableWithoutFeedback
} from "react-native";
import { useSelector, useDispatch, batch } from "react-redux";

import WalletLayout from "../../../components/layouts/WalletLayout";
import { fontSize, fontWeight } from "../../../styles/global";
import Ellipse13 from "../../../../assets/wallet/ellipse-13.svg"
import Ellipse14 from "../../../../assets/wallet/ellipse-14.svg"
import UserContext from "../../../context/context";
import Card from "../../../components/wallet/General/CardV2";
import Logo from "../../../../assets/logo/AGIC Logo.svg";
import SpacerY from "../../../components/wallet/General/SpacerY";
import TextButtonX from "../../../components/buttons/TextButtonX";
import { handleTopLevelAxiosError } from "../../../lib/utils/hooks/error handling";

import {
	getName,
	getGender,
	getEmail,
	rdxSetEmail,
	getPhoneNumbers,
	rdxSetPhoneNumbers,
} from "../../../../store/v2/slices/user";
import { getUser } from "../../../../store/v2/slices/userNotPersisted";
import { getPolicies, rdxSetToastNotif } from "../../../../store/v2/slices/policies";
import { getAccess, rdxResetSession } from "../../../../store/v2/slices/session";
import { formatPhoneNumber } from "../../../lib/utils/formatters";
import { getPolicyInfo, getInsuredSince } from "../../../lib/utils/extraction";
// import { SERVER } from "@env";
import InputPhoneNum from "../../../components/inputs/InputPhoneNumV2";
import InputEmail from "../../../components/inputs/InputEmail";
import Logout from "../../../components/buttons/Logout";
import { updateUser } from "../../../../network/user";

const Profile = ({ navigation }) => {
	const user = useSelector(getUser);
	const policies = useSelector(getPolicies);
	const name = useSelector(getName);
	const insuredSince = getInsuredSince(policies);
	const gender = useSelector(getGender);
	const _email = useSelector(getEmail);
	const _phoneNumbers = useSelector(getPhoneNumbers);
	const accessToken = useSelector(getAccess);

	const _phoneNumbersValid = Array.from({ length: _phoneNumbers?.length }, () => true);

	const { address } = getPolicyInfo(policies);

	const dispatch = useDispatch();

	const [email, setEmail] = useState(_email);
	const [phoneNumbers, setPhoneNumbers] = useState(_phoneNumbers);
	const [emailValid, setEmailValid] = useState(true);
	const [phoneNumbersValid, setPhoneNumbersValid] = useState(_phoneNumbersValid);
	const [editable, setEditable] = useState(false);
	const [allInputsValid, setAllInputsValid] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const valids = [
		emailValid,
		...phoneNumbersValid
	];

	useEffect(() => {
		if (valids.includes(false)) {
			setAllInputsValid(false);
		} else {
			setAllInputsValid(true);
		}
	},[emailValid, phoneNumbersValid]);

	const handleSavePressed = () => {
		updateUser({
			token: accessToken,
			payload: {
				...user,
				occupation: undefined,
				email_address: email,
				phone_numbers: phoneNumbers,
			},
		}).then(({ success, ...rest }) => {
			if (success) {
				console.log("Saved successfully", success);
				setEditable(false);
				batch(() => {
					dispatch(rdxSetEmail(email));
					dispatch(rdxSetPhoneNumbers(phoneNumbers));
				})

			} else {

				console.error(rest);
			}
		}).catch(err => {
			handleTopLevelAxiosError(err, handleSavePressed)
		})
		;
	}

	const styles = StyleSheet.create({
		page: {
			paddingHorizontal: 24 * ratioX,
		},
		content: {
			marginTop: 26 * ratioY,
			zIndex: 3,
		},
		heading: {
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: 24 * ratioY,
			lineHeight: 24 * ratioY,
			color: "#fff",
		},
		cardOuter: {
			marginTop: 28 * ratioY,
			width: "100%",
			zIndex: 2
		},
		cardInner: {
			alignItems: "center",
		},
		spacerX1: {
			width: "100%",
			marginTop: 9 * ratioY,
			marginBottom: 20 * ratioY,
		},
		name: {
			fontWeight: fontWeight["font-weight-1"],
			fontSize: fontSize["font-size-4"] * ratioY,
			lineHeight: 18 * ratioY,
			color: "#222426",
			marginBottom: 8 * ratioY,
		},
		address: {
			fontWeight: fontWeight["font-weight-1"],
			fontSize: fontSize["font-size-3"] * ratioY,
			lineHeight: 16 * ratioY,
			color: "#6E7B87",
			textAlign: "center"
		},
		spacerX2: {
			marginVertical: 20 * ratioY,
		},
		row3: {
			flexDirection: "row",
		},
		dPoint: {
			width: "50%",
			alignItems: "center",
		},
		dProperty: {
			fontWeight: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-0"] * ratioY,
			lineHeight: 10 * ratioY,
			color: "#8D9AA5",
			marginBottom: 10 * ratioY,
		},
		dValue: {
			fontWeight: fontWeight["font-weight-1"],
			fontSize: fontSize["font-size-3"] * ratioY,
			lineHeight: 16 * ratioY,
			color: "#222426",
		},
		inputs: {
			width: "100%",
			marginTop: -10 * ratioY,
			paddingTop: 24 * ratioY,
			paddingHorizontal: 24 * ratioX,
			paddingBottom: 24 * ratioX,
			borderRadius: 6,
			backgroundColor: "#1F2937",
		},
		inputGroup: {
			// alignItems: "flex-start",
			// height: 62 * ratioY,
		},
		inputHeading: {
			marginBottom: 10 * ratioY,
			fontWeight: fontWeight["font-weight-1"],
			fontSize: fontSize["font-size-0"] * ratioY,
			lineHeight: 10 * ratioY,
			color: "#B3BDC6",
		},
		phoneNumberInputs: {
			marginTop: 24 * ratioY,
		},
		edit: {
			marginTop: 24 * ratioY,
		},
		confirm: {
			color: "#fff",
			padding: 8 * ratioY,
			backgroundColor: "#346a49",
			borderRadius: 4,
		},
		logo: {
			height: 52 * ratioY,
			width: 90 * ratioX
		},
		belowLogo: {
			alignItems: "center",
			width: "100%",
		},
		spacer: { backgroundColor: "#D3D9DE", width: "100%", height: 1 },
		modalView: {
			height,
			width,
			justifyContent: "center",
			alignItems: "center",
		},
		innerModal: {
			backgroundColor: "#fff",
			padding: 30,
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
		logoutContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
		},
		logoutButton: {
			paddingHorizontal: 10 * ratioX,
			paddingVertical: 6 * ratioY,
			borderRadius: 6,
			backgroundColor: "#013A8A",
		},
		logoutText: {
			color: "#fff",
			fontSize: 12,
			lineHeight: 18.75,
		},
		ellipsesContainer: {
			position: "absolute",
			top: -124 * ratioY,
			left: -110 * ratioX,
		},
		ellipses: {
			height: 392 * ratioY,
			width: 580 * ratioX
		},
		inputsScrollView: {
			height: "42%"
		}
	});

	return (
		<WalletLayout backgroundColor="#0D489A" statusBarColor="#111827">
			{/* Update failed modal */}
			<Modal animationType="fade" transparent visible={modalVisible}>
				<View style={styles.modalView}>
					<View style={styles.innerModal}>
						<Pressable style={styles.modalCancel} onPress={() => setModalVisible(false)}>
							<View>
								<Text style={styles.modalX}>x</Text>
							</View>
						</Pressable>
						<Text>Update failed.</Text>
					</View>
				</View>
			</Modal>
			{/* Ellipses */}
			<View style={styles.ellipsesContainer}>
				<View style={{ position: "absolute" }}>
					<Ellipse13 height={300} width={580} />
				</View>
				<Ellipse14 height={300} width={580} />
			</View>
			<Pressable onPress={() => Keyboard.dismiss()} style={styles.page}>
				<View style={styles.content}>
					<View style={styles.logoutContainer}>
						<Text style={styles.heading}>Profile</Text>
						<Pressable
							onPress={() => {
								console.log("Logging out")
								navigation.navigate("SignIn");
								dispatch(rdxSetToastNotif(null))
								dispatch(rdxResetSession())
							}}
						>
							<Logout />
						</Pressable>
					</View>
					<View style={styles.cardOuter}>
						<Card>
							<View style={styles.cardInner}>
								<Logo height={styles.logo.height} width={styles.logo.width} />
								{!editable && (
									<View style={[styles.belowLogo]}>
										<View style={[styles.spacer, styles.spacerX1]} />
										<Text style={styles.name}>{name}</Text>
										<Text style={styles.address}>{address}</Text>
										<View style={[styles.spacer, styles.spacerX2]} />
										<View style={styles.row3}>
											<View style={styles.dPoint}>
												<Text style={styles.dProperty}>GENDER</Text>
												<Text style={styles.dValue}>{gender}</Text>
											</View>
											<SpacerY height={36 * ratioY} />
											<View style={styles.dPoint}>
												<Text style={styles.dProperty}>INSURED SINCE</Text>
												<Text style={styles.dValue}>{insuredSince}</Text>
											</View>
										</View>
									</View>
								)}
							</View>
						</Card>
					</View>

					<View style={styles.inputs}>
						<ScrollView style={styles.inputsScrollView}>

							<TouchableWithoutFeedback>
								<View>
									<Text style={styles.inputHeading}>EMAIL ADDRESS</Text>
									<InputEmail
										valid={emailValid}
										setValid={setEmailValid}
										editable={editable}
										keyboardType="email-address"
										placeholder={_email}
										setExtracted={setEmail}
										pageColour={styles.inputs.backgroundColor}
									/>
								</View>
							</TouchableWithoutFeedback>

							{phoneNumbers.map((item, index) => {
								return (
									<TouchableWithoutFeedback key={index}>
										<View style={styles.phoneNumberInputs}>
											<Text style={styles.inputHeading}>{item.type.toUpperCase()} CONTACT</Text>
											<InputPhoneNum
												index={index}
												valid={phoneNumbersValid}
												setValid={setPhoneNumbersValid}
												setExtracted={setPhoneNumbers}
												editable={editable}
												placeholder={formatPhoneNumber(item.phone_number)}
												pageColour={styles.inputs.backgroundColor}
											/>
										</View>
									</TouchableWithoutFeedback>
								)
							})}

						</ScrollView>


						<View style={styles.edit}>
							{!editable ? (
								<Pressable
									onPress={() => {
										setEditable(true);
									}}
								>
									<TextButtonX
										borderRadius={6}
										fontSize={20 * ratioY}
										height={48 * ratioY}
										text="Edit"
										textColor="#fff"
										backgroundColor="#2565BF"
									/>
								</Pressable>
							) : (
								<Pressable
									disabled={!allInputsValid}
									onPress={handleSavePressed}
								>
									<TextButtonX
										disabled={!allInputsValid}
										borderRadius={6}
										fontSize={20 * ratioY}
										height={46 * ratioY}
										text="Save"
										textColor="#fff"
										backgroundColor="#2565BF"
									/>
								</Pressable>
							)}
						</View>

					</View>
				</View>
			</Pressable>
		</WalletLayout>
	);
};

export default Profile;
