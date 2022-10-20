import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";

const LoginLayout = ({ children, backgroundColor, footerColor }) => {

	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: "10.67%", // 40/375
			paddingBottom: (35/812) * height,
		},
		content: {
			alignItems: "center",
		},
		footer: {
			display: "flex",
			// fontFamily: "Inter",
			fontSize: 12,
			lineHeight: 20,
			color: "#8D9AA5", //get the hex for the gray in figma
		},
	});

	let _footerColor;
	if(footerColor) { _footerColor = footerColor }
	else { _footerColor = styles.footer.color }

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<View style={styles.content}>{children}</View>
			<Text style={[styles.footer, { color: _footerColor }]}>Copyright AGIC Insurance Company</Text>
		</View>
	);
};



export default LoginLayout;
