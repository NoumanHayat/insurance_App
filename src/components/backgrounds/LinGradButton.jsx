import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LinGradButton = ({ children, borderBottomEndRadius, colours }) => {
	const styles = StyleSheet.create({
		background: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			borderBottomLeftRadius: borderBottomEndRadius,
			borderBottomRightRadius: borderBottomEndRadius,
			borderRadius: 6
		},
	});

	return (
		<LinearGradient style={styles.background } colors={[...colours]}>
			<SafeAreaView style={styles.background}>
				{children}
			</SafeAreaView>
		</LinearGradient>
	);
};

export default LinGradButton;
