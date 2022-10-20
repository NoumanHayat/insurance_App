import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LinGradBackground = ({ children, borderBottomEndRadius, justify }) => {
	const styles = StyleSheet.create({
		background: {
			flex: 1,
			alignItems: "center",
			justifyContent: justify && "center",
			borderBottomLeftRadius: borderBottomEndRadius,
			borderBottomRightRadius: borderBottomEndRadius
		},
	});

	return (
		<LinearGradient style={{ flex: 1 }}colors={["#1154B1", "#0D489A"]}>
			<View style={styles.background}>
				{children}
			</View>
		</LinearGradient>
	);
};

export default LinGradBackground;
