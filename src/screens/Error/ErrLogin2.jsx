import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import LargeButton from "../../components/buttons/LargeButton";
import LoginLayout from "../../components/layouts/LoginLayout";
import HeaderText from "../../components/text/HeaderText";
import TextBlock from "../../components/text/textBlock";
import MediumText from "../../components/text/MediumText";
import InputText from "../../components/inputs/InputText"
// import SquareCheckbox from "../../components/misc/SquareCheckbox";

const ErrLogin2 = ({ navigation }) => {
	const { height, width } = useWindowDimensions();

	const styles = StyleSheet.create({
		header: {
			alignSelf: "flex-start",
			marginTop: (146 / 812) * height,
		},
		medium: {
			alignSelf: "flex-start",
		},
		textBlock: {
			marginTop: (35 / 812) * height,
		},
		textInput: {
			marginTop: (15 / 812) * height,
			width: "100%",
		},
		rememberMeContainer: {
			marginTop: (17/812) * height,
			alignSelf: "flex-start",
			flexDirection: "row",
			alignItems: "center",
		},
		rememberMe: {
			fontSize: 12,
			lineHeight: 14.06,
			color: "#222426",
			paddingLeft: 11
		},
		getStarted: {
			marginTop: (138 / 812) * height,
			width: "100%",
		},
	});

	return (
		<LoginLayout>
			<View style={styles.header}>
				<HeaderText text="Welcome, let's setup your profile." />
			</View>
			<View style={styles.textBlock}>
				<TextBlock
					backgroundColor="#EDF0F2"
					text="Instructions text some text to tell people what is happening an what to do. Instructions text some text to tell people what is happening an what to do."
				/>
			</View>
			<View style={styles.medium}>
				<MediumText text="Login" />
			</View>
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
				{/* <SquareCheckbox /> */}
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

export default ErrLogin2;
