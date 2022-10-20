import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import UserContext from "../../context/context";

const LinGradCircle = ({ children, borderBottomEndRadius }) => {

	const { width, height } = useWindowDimensions();
	const { modelX, modelY} = useContext(UserContext);
	// eslint-disable-next-line
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		background: {
			flex: 1,
            height: 186,
            width: 186,
            borderRadius: 93,
			alignItems: "center",
			justifyContent: "center",
			borderBottomLeftRadius: borderBottomEndRadius,
			borderBottomRightRadius: borderBottomEndRadius
		},
	});

	return (
		<LinearGradient style={styles.background} colors={["#033C8D","#0E4A9F00"]}>
			<SafeAreaView style={styles.background}>
				{children}
			</SafeAreaView>
		</LinearGradient>
	);
};

export default LinGradCircle;
