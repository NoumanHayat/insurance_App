import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	useWindowDimensions,
} from "react-native";

import WalletLayout from "../../../components/layouts/WalletLayout";

const Profile1 = () => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		topBar: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: (32 / 812) * height,
		},
		profile: {
			fontSize: 18,
			lineHeight: 22,
			fontWeight: "600",
		},
		save: {
			fontSize: 14,
			lineHeight: 16,
			color: "#6E7B87",
		},
		sub1: {
			marginTop: (55 / 812) * height,
		},
		subRemaining: {
			marginTop: (40/812) * height,
		},
		sub: {
			fontSize: 12,
			lineHeight: 16,
			fontWeight: "500",
			color: "#6E7B87",
		},
		input1: {
			marginTop: (12 / 812) * height,
		},
		inputRemaining: {
			marginTop: (10 / 812) * height,
		},
		input: {
			height: (36 / 812) * height,
			width: "100%",
			padding: 10,
            backgroundColor: "#EDF0F2",
			color: "#353B40",
			borderWidth: 1,
			borderColor: "#D3D9DE",
			fontSize: 14,
			lineHeight: 16.41,
		},
	});
	return (
		<WalletLayout>
			<View style={styles.topBar}>
				<Text style={styles.profile}>Profile</Text>
                <Text style={styles.save}>Save</Text>
			</View>
            <Text style={[styles.sub, styles.sub1]}>Personal Info</Text>
            <TextInput style={[styles.input, styles.input1]} placeholder="First Name" placeholderTextColor="#6E7B87"/>
            <TextInput style={[styles.input, styles.inputRemaining]} placeholder="Last Name" placeholderTextColor="#6E7B87"/>

            <Text style={[styles.sub, styles.subRemaining]}>Contact Details</Text>
            <TextInput style={[styles.input, styles.input1]} placeholder="Primary Number" placeholderTextColor="#6E7B87"/>
            <TextInput style={[styles.input, styles.inputRemaining]} placeholder="Other Number" placeholderTextColor="#6E7B87"/>

            <Text style={[styles.sub, styles.subRemaining]}>Home Address</Text>
            <TextInput style={[styles.input, styles.input1]} placeholder="Address Line 1" placeholderTextColor="#6E7B87"/>
            <TextInput style={[styles.input, styles.inputRemaining]} placeholder="Address Line 2" placeholderTextColor="#6E7B87"/>
            <TextInput style={[styles.input, styles.inputRemaining]} placeholder="City" placeholderTextColor="#6E7B87"/>
            <TextInput style={[styles.input, styles.inputRemaining]} placeholder="Country" placeholderTextColor="#6E7B87"/>

		</WalletLayout>
	);
};

export default Profile1;
