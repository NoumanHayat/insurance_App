import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { colour, fontSize, lineHeight, fontWeight } from "../../styles/global";

import LargeButton from "../../components/buttons/LargeButton";
import LoginLayout from "../../components/layouts/LoginLayout";
import InputText from "../../components/inputs/InputText";
import SquareCheckbox from "../../components/checkboxes/SquareCheckbox";
import TextBlock from "../../components/text/textBlock";
// import SquareCheckbox from "../../components/misc/SquareCheckbox";

const Login2 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		header: {
			alignSelf: "flex-start",
			marginTop: (146 / 812) * height,
			color: colour["colour-text-body-default"],
			fontSize: fontSize["font-size-4"],
			lineHeight: lineHeight["line-height-heading"],
			fontWeight: fontWeight["font-weight-2"],
		},
		medium: {
			alignSelf: "flex-start",
			fontWeight: "500",
			fontSize: fontSize["font-size-3"],
			lineHeight: lineHeight["line-height-heading"],
			marginTop: (36 / 812) * height,
		},
		textBlock: {
			marginTop: (35 / 812) * height,
		},
		textInput: {
			marginTop: (15 / 812) * height,
			alignSelf: "stretch",
		},
		rememberMeContainer: {
			marginTop: (17 / 812) * height,
			alignItems: "center",
			alignSelf: "flex-start",
			flexDirection: "row",
			alignItems: "center",
		},
		rememberMe: {
			fontSize: fontSize["font-size-1"],
			lineHeight: lineHeight["line-height-text"],
			color: colour["colour-text-body-default"],
			paddingLeft: 11,
		},
		getStarted: {
			marginTop: (107 / 812) * height,
			alignSelf: "stretch",
		},
	});

	return (
		<LoginLayout>
			<Text style={styles.header}>Welcome, Lets setup your profile.</Text>

			<View style={styles.textBlock}>
				<TextBlock
					text="Instructions text some text to tell people what is happening an what to
				do. Instructions text some text to tell people what is happening an what
				to do."
				/>
			</View>
			<Text style={styles.medium}>Login</Text>
			<View style={styles.textInput}>
				<InputText placeholder="Enter TRN/Driver's License #" />
			</View>
			<View style={styles.textInput}>
				<InputText placeholder="License Plate #" />
			</View>
			<View style={styles.textInput}>
				<InputText placeholder="Phone Number" />
			</View>
			<View style={styles.rememberMeContainer}>
				<SquareCheckbox />
				<Text style={styles.rememberMe}>Remember me</Text>
			</View>
			<View style={styles.getStarted}>
				<LargeButton
					to="Login3"
					navigation={navigation}
					text="Get Started"
					disabled={false}
				/>
			</View>
		</LoginLayout>
	);
};

export default Login2;
