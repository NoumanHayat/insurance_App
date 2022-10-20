import React, { useContext } from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";


import UserContext from "../../context/context";

const Logout = () => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;


	const styles = StyleSheet.create({
		logoutButton: {
			paddingHorizontal: 10 * ratioX,
			paddingVertical: 6 * ratioY,
			borderRadius: 6,
			backgroundColor: "#013A8A",
		},
		logoutText: {
			color: "#fff",
			fontSize: 14 * ratioY,
			lineHeight: 14 * ratioY,
		},
	});

	return (
		<View style={styles.logoutButton}>
			<Text style={styles.logoutText}>Logout</Text>
		</View>
	);
};

export default Logout;
