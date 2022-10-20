import React from "react";
import {
	View,
	StyleSheet,
	useWindowDimensions,
	Text,
} from "react-native";

import { colour, fontWeight, fontSize, lineHeight } from "../../styles/global";

import LoginLayout from "../../components/layouts/LoginLayout";
import Tick from "../../../assets/tick.svg";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";

const Login4 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		done: {
			height: 100,
			width: 100,
		},
		animContainer: {
			marginTop: (264 / 812) * height, // 264/812
		},
		medium: {
			marginTop: (41 / 812) * height,
			fontWeight: fontWeight["font-weight-4"],
			fontSize: fontSize["font-size-3"],
			lineHeight: lineHeight["line-height-heading"],
		},
		textBlock: {
			marginTop: (31 / 812) * height,
		},
		continue: {
			marginTop: (88 / 812) * height,
			alignSelf: "stretch",
		},
	});

	return (
		<LoginLayout>
			<View style={styles.animContainer}>
				<Tick style={styles.done} />
			</View>
			<Text style={styles.medium}>Success!</Text>
			<View style={styles.textBlock}>
				<TextBlock text="We’ve identified your account. A One Time Password has been sent to the phone number provided, please verify this code in the next screen." />
			</View>
			<View style={styles.continue}>
				<LargeButton
					disabled={false}
					navigation={navigation}
					to="Login5"
					text="Continue"
				/>
			</View>
		</LoginLayout>
	);
};

export default Login4;
