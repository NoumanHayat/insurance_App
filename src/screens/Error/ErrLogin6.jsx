import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	useWindowDimensions,
} from "react-native";

import LoginLayout from "../../components/layouts/LoginLayout";
import HeaderText from "../../components/text/HeaderText";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";
import OTPInput from "../../components/misc/OTPInput";

const ErrLogin6 = ({ navigation }) => {
	const { height, width } = useWindowDimensions();

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
		},
		textBlock: {
			marginTop: (18 / 812) * height,
		},
		otpHeadingContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: (52 / 812) * height,
			width: "100%",
		},
		otpHeading: {
			fontSize: 14,
			lineHeight: 20,
			fontWeight: "500",
		},
		inputs: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: (16 / 812) * height,
			
		},
		codeNotReceived: {
			color: "#353B40",
			fontSize: 12,
			lineHeight: 20,
		},
		confirm: {
			marginTop: (116 / 812) * height,
			width: "100%",
		},
		error: {
			fontSize: 12,
			lineHeight: 14.06,
			color: "#6E7B87",
			marginTop: (10/812) * height,
			alignSelf: "flex-start"
		},
		spacer: {
			width: (22/812) * width
		}
	});

	const separator = () => <View style={styles.spacer}/>

	return (
		<LoginLayout>
			<View style={styles.heading}>
				<HeaderText text="Verify your identity" />
			</View>
			<View style={styles.textBlock}>
				<TextBlock
					backgroundColor="#EDF0F2"
					text="Instructions text some text to tell people what is happening an what to do. Instructions text some text to tell people what is happening an what to do."
				/>
			</View>
			<View style={styles.otpHeadingContainer}>
				<Text style={styles.otpHeading}>One-time Password</Text>
				<Text style={styles.codeNotReceived}>Code not received?</Text>
			</View>
			<View style={styles.inputs}>
				{/* <FlatList
					data={inputs}
					renderItem={({ item }) => item}
					keyExtractor={(item, index) => index}
					horizontal
					ItemSeparatorComponent={separator}
				/> */}
				{inputs.map((input, index) => <View key={index}>{input}</View>)}
			</View>
			<Text style={styles.error}>Error message</Text>
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

export default ErrLogin6;
