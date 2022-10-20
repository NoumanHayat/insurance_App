import React, { useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { colour, borderRadius } from "../../styles/global";

import Circle from "../../../assets/buttons/radio/radioCircle.svg";

const CustomRadioButton = ({ pageColour, selected, setSelected, value }) => {
	const platform = Platform.OS;

	const styles = StyleSheet.create({
		layer1: {
			borderRadius: 16,
			height: 32,
			width: 32,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#374151",
			borderWidth: 2,
			borderColor: "#6B7280",
		},
		layer2: {
			height: 24,
			width: 24,
			borderRadius: 12,
			backgroundColor: pageColour,
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
		yellowBall: {
			backgroundColor: "#FFD53D",
			height: 16,
			width: 16,
			borderRadius: 8
		}
	});

	const circleOpacity = useSharedValue(0);

	const circleStyles = useAnimatedStyle(() => {
		return {
			opacity: circleOpacity.value
		}
	})



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
						<Pressable onPress={() => setSelected(value)}>
							<View style={styles.layer1}>
								<View style={selected == value && styles.layer2}>
									<View style={selected == value && styles.layer2}>
										{/* {selected == value ? <Circle /> : <></>} */}
										{selected == value && <View style={styles.yellowBall}/>}
									</View>
								</View>
							</View>
						</Pressable>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={styles.shadow2}></View>
					<Pressable onPress={() => setSelected(value)}>
						<View style={styles.layer1}>
							<View style={selected == value && styles.layer2}>
								<View style={selected == value && styles.layer2}>
									{/* {selected == value ? <Circle /> : <></>} */}
									{selected == value && <View style={styles.yellowBall}/>}
								</View>
							</View>
						</View>
					</Pressable>
				</View>
			)}
		</>
	);
};

export default CustomRadioButton;
