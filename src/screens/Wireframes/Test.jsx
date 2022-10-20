import React, { useRef } from "react";
import { View, Text, StyleSheet, useWindowDimensions, } from "react-native";
import Left from "../../components/animations/Page Indicator/Left";

const Test = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const testRef = useRef();

	return (
		<View style={styles.page}>
			<Left />
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#222426",
		justifyContent: "center",
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

export default Test;
