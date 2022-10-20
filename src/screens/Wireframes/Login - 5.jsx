import React, { useState } from "react";
import { useWindowDimensions, StyleSheet, View, Text } from "react-native";

import { colour, fontWeight, fontSize, lineHeight } from "../../styles/global";

import LoginLayout from "../../components/layouts/LoginLayout";
import TextBlock from "../../components/text/textBlock";
import LargeButton from "../../components/buttons/LargeButton";
import CheckboxOption from "../../components/checkboxes/CheckboxOption";

const Login5 = ({ navigation }) => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		header: {
			marginTop: (146 / 812) * height,
			fontWeight: fontWeight["font-weight-2"],
			fontSize: fontSize["font-size-4"],
			lineHeight: lineHeight["line-height-heading"],
		},
		textBlock: {
			marginTop: (34 / 812) * height,
		},
		check1: {
			marginTop: (43 / 812) * height,
			alignSelf: "stretch",
		},
		check2: {
			marginTop: (12 / 812) * height,
			alignSelf: "stretch",
		},
		confirm: {
			marginTop: (226 / 812) * height,
			alignSelf: "stretch",
		},
	});

	const [isOption1, setIsOption1] = useState(true);

	return (
		<LoginLayout>
			<Text style={styles.header}>Select verification method</Text>
			<View style={styles.textBlock}>
				<TextBlock text="Do you still have acces to the number below? Please ensure you can access this number, it will cme in handy in the steps to follow." />
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
			<View style={styles.confirm}>
				<LargeButton navigation={navigation} to="Login6" text="Confirm" />
			</View>
		</LoginLayout>
	);
};

export default Login5;
