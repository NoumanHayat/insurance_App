import React from "react";
import {
	View,
	StyleSheet,
	KeyboardAvoidingView
} from "react-native";

import CustomStatusBar from "../misc/CustomStatusBar";

const KeyboardAwareAppLayout = ({ children, behavior, keyboardVerticalOffset }) => {

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#000"
		},
		children: {
			flex: 1,
		},
	});

	return (
		<KeyboardAvoidingView 
		contentContainerStyle={{ flex: 1 }} 
		behavior={behavior ?? "height"} 
		style={styles.children}
		keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<CustomStatusBar color="#111827" />
			<View style={styles.container}>
				{children}
			</View>
		</KeyboardAvoidingView>
	);
};





export default KeyboardAwareAppLayout;
