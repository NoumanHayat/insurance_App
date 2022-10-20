import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Shadow } from "react-native-shadow-2";

import Check from "../../../assets/checkbox/check.svg";

const CustomCheckbox = ({ pageColour, active }) => {

	const platform = Platform.OS;

	const styles = StyleSheet.create({
		layer1: {
			borderWidth: 1,
			borderColor: "#6B7280",
			borderRadius: 6,
			height: 30,
			width: 30,
			justifyContent: "center",
			alignItems: "center",
		},
		layer2: {
			backgroundColor: "#374151",
			borderColor: "#6B7280",
			borderWidth: 1,
			borderRadius: 4.6,
			height: 28,
			width: 28,
			justifyContent: "center",
			alignItems: "center",
		},
		shadow1: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 10,
			},
			shadowRadius: 15,
			shadowOpacity: 0.12,
		},
		shadow2: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowRadius: 6,
			shadowOpacity: 0.07,
		},
	});

	return (
		<>
			{platform == "android" ? (
				<Shadow
					startColor="rgba(0,0,0,0.12)"
					finalColor={pageColour ?? "#222426"}
					radius={15}
					offset={[0, 10]}>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour ?? "#222426"}
						radius={6}
						offset={[0, 4]}>
						<View style={styles.layer1}>
							<View style={styles.layer2}>
								{active ? <Check /> : <></>}
							</View>
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={styles.shadow2}></View>
					<View style={styles.layer1}>
						<View style={styles.layer2}>{active ? <Check /> : <></>}</View>
					</View>
				</View>
			)}
		</>
	);
};

export default CustomCheckbox;
