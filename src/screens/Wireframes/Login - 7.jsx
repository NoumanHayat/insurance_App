import React from "react";
import { StyleSheet, useWindowDimensions, View, Text } from "react-native";

import { colour, fontWeight, fontSize, lineHeight } from "../../styles/global";

import LoginLayout from "../../components/layouts/LoginLayout";
import MediumText from "../../components/text/MediumText";
import TextBlock from "../../components/text/textBlock";

import LoadingCircle from "../../components/animations/LoadingCircle";

const Login7 = (props) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		animContainer: {
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
	});

	return (
		<LoginLayout>
			<View style={styles.animContainer}>
				<LoadingCircle navigation={props.navigation} to="Login8" />
			</View>
			<Text style={styles.medium}>Syncing your profile data</Text>
			<View style={styles.textBlock}>
				<TextBlock text="Were fetching your saved data from our servers and building your profile, this will only take a few seconds." />
			</View>
		</LoginLayout>
	);
};

export default Login7;
