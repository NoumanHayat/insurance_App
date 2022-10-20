import React from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Shadow } from "react-native-shadow-2";

const Share = ({ pageColor: pageColour }) => {

	const { height, width } = useWindowDimensions();
	const platform = Platform.OS;

	const styles = StyleSheet.create({
		container: {
			backgroundColor: "#fff",
			height: (15/866) * height,
			width: (42/410) * width,
			borderRadius: 4,
			justifyContent: "center",
			alignItems: "center",
		},
		innerContainer: {
			width: (26/424) * width,
			flexDirection: "row",
			justifyContent: "space-between",
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

	const baseArray = [0, 0, 0];

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
							<View style={styles.innerContainer}>
								{baseArray.map((entry, index) => (
									<Svg height={6} width={6} key={index}>
										<Circle cx={3} cy={3} r={3} fill="#353B40" />
									</Svg>
								))}
							</View>
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={[styles.container, styles.shadow2]}>
						<View style={styles.innerContainer}>
							{baseArray.map((entry, index) => (
								<Svg height={6} width={6} key={index}>
									<Circle cx={3} cy={3} r={3} fill="#353B40" />
								</Svg>
							))}
						</View>
					</View>
				</View>
			)}
		</>
	);
};

export default Share;
