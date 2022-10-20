import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, } from "react-native";

import LoadingBar from "../../components/animations/LoadingBar";
import CustomCheckbox from "../../components/checkboxes/CustomCheckbox";
import InputText from "../../components/inputs/InputText";


const Login1 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	return (
		<View style={styles.page}>
			<Text style={[styles.heading, { marginTop: 0.3496 * height }]}>AGIC</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#222426",
		alignItems: "center",
		flex: 1,
	},

	heading: {
		color: "#fff",
		marginTop: "34.96%", // 284/812
		fontSize: 56,
		fontWeight: "700",
		lineHeight: 67.77,
	},
});

export default Login1;
