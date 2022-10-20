import React from "react";
import { View, StyleSheet, Text } from "react-native";

import CircleCheckbox from "./CircleCheckbox";

const CheckboxOption = ({
	text,
	isChecked,
	setIsChecked,
}) => {
	return (
		<View style={styles.container}>
			<CircleCheckbox 
            isChecked={isChecked} 
            setIsChecked={setIsChecked} 
            />
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 36,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderColor: "#D3D9DE"
	},
	text: {
		marginLeft: 10,
		fontSize: 14,
		lineHeight: 16.41
	},
});

export default CheckboxOption;
