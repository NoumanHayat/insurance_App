import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	useWindowDimensions,
} from "react-native";

import { colour, fontWeight, fontSize, lineHeight } from "../../styles/global";

import LoginLayout from "../../components/layouts/LoginLayout";
import HeaderText from "../../components/text/HeaderText";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";
import OTPInput from "../../components/inputs/OTPInput";

const Login6 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const [passwordEntered, setPasswordEntered] = useState(false);

	const [one, setOne] = useState();
	const [two, setTwo] = useState();
	const [three, setThree] = useState();
	const [four, setFour] = useState();
	const [five, setFive] = useState();
	const [six, setSix] = useState();

	// const refs = new Array(6).fill(React.createRef());

	const oneRef = useRef();
	const twoRef = useRef();
	const threeRef = useRef();
	const fourRef = useRef();
	const fiveRef = useRef();
	const sixRef = useRef();

	const states = [one, two, three, four, five, six];
	const setStates = [setOne, setTwo, setThree, setFour, setFive, setSix];
	const refs = [oneRef, twoRef, threeRef, fourRef, fiveRef, sixRef];

	const inputs = states.map((state, index) => (
		<OTPInput
			key={index}
			index={index}
			innerRef={refs[index]}
			refs={refs}
			state={states[index]}
			setState={setStates[index]}
		/>
	));

	useEffect(() => {
		if (states.every((value) => value !== undefined && value !== "")) {
			setPasswordEntered(true);
		} else {
			setPasswordEntered(false);
		}
	});

	const styles = StyleSheet.create({
		heading: {
			marginTop: (263 / 812) * height,
			fontWeight: fontWeight["font-weight-2"],
			fontSize: fontSize["font-size-4"],
			lineHeight: lineHeight["line-height-heading"],
		},
		textBlock: {
			marginTop: (18 / 812) * height,
		},
		otpHeadingContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: (52 / 812) * height,
			alignSelf: "stretch",
		},
		otpHeading: {
			fontSize: fontSize["font-size-2"],
			lineHeight: 20,
			fontWeight: fontWeight["font-weight-2"],
		},
		inputs: {
			marginTop: (16 / 812) * height,
			alignSelf: "stretch",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		codeNotReceived: {
			color: "#353B40",
			fontSize: 12,
			lineHeight: 20,
		},
		confirm: {
			marginTop: (116 / 812) * height,
			alignSelf: "stretch",
		},
		keyboardActive: {},
	});

	return (
		<LoginLayout>
			<View style={styles.heading}>
				<HeaderText text="Verify your identity" />
			</View>
			<View style={styles.textBlock}>
				<TextBlock text="Instructions text some text to tell people what is happening an what to do. Instructions text some text to tell people what is happening an what to do." />
			</View>
			<View style={styles.otpHeadingContainer}>
				<Text style={styles.otpHeading}>One-time Password</Text>
				<Text style={styles.codeNotReceived}>Code not received?</Text>
			</View>

			<View style={styles.inputs}>{inputs.map((input) => input)}</View>
				<View style={styles.confirm}>
					<LargeButton
						disabled={!passwordEntered}
						text="Confirm"
						navigation={navigation}
						to="Login7"
					/>
				</View>
		</LoginLayout>
	);
};

export default Login6;
