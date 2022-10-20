import React, { useState, useEffect, useContext } from "react";
import {
	TextInput,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Svg, Line } from "react-native-svg";

import {
	colour,
	fontSize,
	fontWeight,
	borderRadius,
} from "../../styles/global";

import UserContext from "../../context/context";
import { isNumeric } from "../../lib/utils/input validation/general";

const OTPInput = ({ index, innerRef, refs, state, setState, pageColour, valid, setValid }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (index == 0) {
			innerRef.current.focus();
		}
	}, []);

	const styles = StyleSheet.create({
		container: {
			height: 65 * ratioY,
			width: 48.67 * ratioX,
			alignItems: "center",
			paddingTop: 50 * ratioY,
		},
		input: {
			flex: 1,
			position: "absolute",
			height: 65 * ratioY,
			width: "100%",
			borderWidth: 1,
			textAlign: "center",
			backgroundColor: colour["colour-background-input"],
			borderColor: !valid ? "#f56983" : ( isFocused ? colour["colour-border-input-number--focused"] : colour["colour-border-input-number--unfocused"]),
			color: "#fff",
			borderRadius: borderRadius["border-radius-3"],
			fontSize: fontSize["font-size-6"],
			fontWeight: fontWeight["font-weight-2"],
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
		underline: {
			width: 24 * ratioX,
			zIndex: 3,
			height: 4,
		},
	});


	return (
		<>
			{platform == "android" ? (
				<Shadow
					startColor="rgba(0,0,0,0.12)"
					finalColor={pageColour}
					radius={15}
					offset={[0, 10]}>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour}
						radius={6}
						offset={[0, 4]}>
						<View style={styles.container}>
							<TextInput
								ref={innerRef}
								onFocus={() => setIsFocused(true)}
								onEndEditing={() => setIsFocused(false)}
								style={styles.input}
								keyboardType="number-pad"
								maxLength={1}
								selectTextOnFocus={true}
								value={state}
								onChangeText={(value) => {
									if(isNumeric(value)){
										setValid(true);
										setState(value);
										if (refs[index + 1]) {
											refs[index + 1].current.focus();
										}
									} else {
										setValid(false);
									}
								}}
								selectionColor="#fff"
							/>
							{isFocused && (state == undefined || state == "") && (
								<Svg style={styles.underline}>
									<Line
										strokeWidth={2}
										stroke={valid ? colour["color-number-input-default"] : "#f56983"}
										strokeLinecap="round"
										y={2}
										x1={0}
										x2={styles.underline.width}
									/>
								</Svg>
							)}
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					
					<View style={[styles.container, styles.shadow2]}>
							<TextInput
								ref={innerRef}
								onFocus={() => setIsFocused(true)}
								onEndEditing={() => setIsFocused(false)}
								style={styles.input}
								keyboardType="number-pad"
								maxLength={1}
								selectTextOnFocus={true}
								value={state}
								onChangeText={(value) => {
									if(isNumeric(value)){
										setValid(true);
										setState(value);
										if (refs[index + 1]) {
											refs[index + 1].current.focus();
										}
									} else {
										setValid(false);
									}
								}}
								selectionColor="#fff"
							/>
							{isFocused && (state == undefined || state == "") && (
								<Svg style={styles.underline}>
									<Line
										strokeWidth={2}
										stroke={valid ? colour["color-number-input-default"] : "#f56983"}
										strokeLinecap="round"
										y={2}
										x1={0}
										x2={styles.underline.width}
									/>
								</Svg>
							)}
						</View>
				</View>
			)}
		</>
	);
};

export default OTPInput;
