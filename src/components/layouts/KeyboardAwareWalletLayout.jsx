import React from "react";
import {
	View,
	StyleSheet,
	KeyboardAvoidingView
} from "react-native";
import CustomStatusBar from "../misc/CustomStatusBar";

const KeyboardAwareWalletLayout = ({ children, backgroundColor, statusBarColor }) => {

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor,
		},
	});

	return (
		<View style={{ flex: 1 }}>
			<CustomStatusBar color={statusBarColor} />
			<KeyboardAvoidingView behavior="position" style={styles.container}>
				{children}
			</KeyboardAvoidingView>
		</View>
	);
};





export default KeyboardAwareWalletLayout;
