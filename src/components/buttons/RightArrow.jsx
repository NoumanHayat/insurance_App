import React from "react";
import { View, StyleSheet } from "react-native";

import Arrow from "../../../assets/buttons/rightArrow.svg";
import { Svg, Circle } from "react-native-svg";

const RightArrow = () => {

	const styles = StyleSheet.create({
		nav: {
			justifyContent: "center",
			alignItems: "center",
		},
		button: {
			position: "absolute",
		},
	});

	return (
		<View style={styles.nav}>
			<Svg style={styles.button} height={56} width={56}>
				<Circle r={28} cx={28} cy={28} fill="#FFD53D" />
			</Svg>
			<Arrow />
		</View>
	);
};

export default RightArrow;
