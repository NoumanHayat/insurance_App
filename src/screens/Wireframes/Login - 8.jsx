import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

import LoginLayout from "../../components/layouts/LoginLayout";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";

const Login8 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: "#353B40",
			flex: 1,
		},
		mystery: {
			marginTop: (122 / 812) * height,
			height: 300,
			width: 230,
			backgroundColor: "#525B64",
		},

		greeting: {
			marginTop: (42 / 812) * height,
			fontSize: 20,
			lineHeight: 24.2,
			fontWeight: "600",
			color: "#fff",
		},
		textBlock: {
			marginTop: (10 / 812) * height,
		},
		myProfile: {
			marginTop: (25 / 812) * height,
			alignSelf: "stretch",
		},
	});

	return (
		<View style={styles.container}>
			<LoginLayout footerColor="#6E7B87">
				<View style={styles.mystery} />
				<Text style={styles.greeting}>Welcome, Sergio!</Text>
				<View style={styles.textBlock}>
					<TextBlock
						backgroundColor="#353B40"
						textColor="#8D9AA5"
						text="We’ve synced your data and setup your account. We also did some cool stuff to enhance your experience with our app."
					/>
				</View>
				<View style={styles.myProfile}>
					<LargeButton
						navigation={navigation}
						to="MyWallet"
						textColor="#353B40"
						background="#EDF0F2"
						text="My Profile"
						params={{ error: false }}
					/>
				</View>
			</LoginLayout>
		</View>
	);
};

export default Login8;
