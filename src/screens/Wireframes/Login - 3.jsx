import React from "react";
import { View, Image, StyleSheet, useWindowDimensions, Text } from "react-native";

import { colour, fontSize, fontWeight, lineHeight } from "../../styles/global";

import LoginLayout from "../../components/layouts/LoginLayout";
import TextBlock from "../../components/text/textBlock";
import LoadingCircle from "../../components/animations/LoadingCircle";

const Login3 = (props) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		loadingCircle: {
			marginTop: (264 / 812) * height,
		},
		medium: {
			marginTop: (41 / 812) * height,
			fontWeight: fontWeight["font-weight-2"],
			fontSize: fontSize["font-size-3"],
			lineHeight: lineHeight["line-height-heading"],
		},
		textBlock: {
			marginTop: (31 / 812) * height,
		},
		textInput: {
			marginTop: (15 / 812) * height,
		},
		getStarted: {
			marginTop: (138 / 812) * height,
		},
	});

	return (
		<LoginLayout>
			<View style={styles.loadingCircle}>
				<LoadingCircle navigation={props.navigation} to="Login4" />
			</View>
			<Text style={styles.medium}>Creating your profile</Text>
			<View style={styles.textBlock}>
				<TextBlock text="We’re fetching your saved data from our servers and building your profile, this will only take a few seconds." />
			</View>
		</LoginLayout>
	);
};

export default Login3;
