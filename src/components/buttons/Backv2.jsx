import React, { useContext } from "react";
import {
	View,
	StyleSheet,
	Text,
	useWindowDimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

import {
	fontSize,
	fontWeight,
	borderRadius,
} from "../../styles/global";

import UserContext from "../../context/context";

const Back = ({ backgroundColor: pageColour, disabled }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			borderRadius: borderRadius["border-radius-2"],
			backgroundColor: disabled ? "#374151" : "#525B64",
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 8 * ratioX,
			paddingVertical: 6 * ratioY
		},
		text: {
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"],
			lineHeight: 18.75,
			color: disabled ? "#6B7280"  : "#fff",
		},
		shadow1: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowRadius: 4,
			shadowOpacity: 0.08,
		},
		shadow2: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowRadius: 6,
			shadowOpacity: 0.12,
		},
	});

	return (
		<>
			{platform == "android" ? (
				<Shadow
					startColor="rgba(0,0,0,0.12)"
					finalColor={pageColour}
					radius={6}
					offset={[0, 4]}>
					<Shadow
						startColor="rgba(0,0,0,0.08)"
						finalColor={pageColour}
						radius={4}
						offset={[0, 2]}>
						<View style={styles.container}>
							<Text style={styles.text}>Back</Text>
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={[styles.container, styles.shadow2]}>
						<Text style={styles.text}>Back</Text>
					</View>
				</View>
			)}
		</>
	);
};

export default Back;
