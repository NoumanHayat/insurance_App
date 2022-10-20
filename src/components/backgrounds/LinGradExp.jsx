import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LinGradExp = ({ children, borderBottomEndRadius }) => {
	const styles = StyleSheet.create({
		background: {
			// flex: 1,
			alignItems: "center",
			paddingTop: 25, //temporary fix for SafeArea
			borderBottomLeftRadius: borderBottomEndRadius,
			borderBottomRightRadius: borderBottomEndRadius
		},
	});

	return (
		<LinearGradient style={styles.background} colors={["#1154B1", "#0D489A"]}>
			{children}
		</LinearGradient>
	);
};

export default LinGradExp;
