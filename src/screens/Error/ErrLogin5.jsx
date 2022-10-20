import React, { useState } from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";

import InputText from "../../components/inputs/InputText";
import LoginLayout from "../../components/layouts/LoginLayout";
import HeaderText from "../../components/text/HeaderText";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";
import CheckboxOption from "../../components/checkboxes/CheckboxOption";

const ErrLogin5 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		header: {
			marginTop: (146 / 812) * height,
		},
		textBlock: {
			marginTop: (34 / 812) * height,
		},
		check1: {
			marginTop: (43 / 812) * height,
			width: "100%",
		},
		check2: {
			marginTop: (12 / 812) * height,
			width: "100%",
		},
		confirm: {
			marginTop: (114 / 812) * height,
			width: "100%",
		},
	});

	const [isOption1, setIsOption1] = useState(true);

	return (
		<LoginLayout>
			<View style={styles.header}>
				<HeaderText text="Please confirm your phone number" />
			</View>
			<View style={styles.textBlock}>
				<TextBlock
					backgroundColor="#EDF0F2"
					text="We didnt find a number on your profile, please enter a phone number you have access to. This is required for the next steps."
				/>
			</View>
			<View style={styles.check1}>
				<CheckboxOption
					setIsChecked={() => setIsOption1(true)}
					isChecked={isOption1}
					text="Digicel: 876 *** 2182"
				/>
			</View>
			<View style={styles.check2}>
				<CheckboxOption
					setIsChecked={() => setIsOption1(false)}
					isChecked={!isOption1}
					text="Other"
				/>
			</View>
			<View style={styles.check2}>
				<InputText placeholder="Policy Number" />
			</View>
			<View style={styles.check2}>
				<InputText placeholder="License Plate Number"/>
			</View>
			<View style={styles.confirm}>
				<LargeButton navigation={navigation} to="Login6" text="Confirm" />
			</View>
		</LoginLayout>
	);
};

export default ErrLogin5;
