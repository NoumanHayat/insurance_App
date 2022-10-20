import React, { useContext, useState } from "react";
import {
	TextInput,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Shadow } from "react-native-shadow-2";

import {
	borderRadius,
	colour,
	fontSize,
	fontWeight,
	lineHeight,
} from "../../styles/global";

import UserContext from "../../context/context";

const InputTextV4 = ({
	keyboardType,
	placeholder,
	pageColour,
	editable,
	setExtracted,
	valid,
	setValid,
	background,
	value
}) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;
	// eslint-disable-next-line
	const [text, setText] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const minLength = 4;
	const maxLength = 12;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			width: "100%",
			justifyContent: "center",
			alignItems: "flex-end"
		},
		input: {
			height: "100%",
			width: platform == "ios" ? "100%" : 295 * ratioX,
			borderWidth: 1,
			borderColor:
				submitted && !valid
					? colour["colour-input-invalid"]
					: colour["colour-border-input-default"],
			backgroundColor: background,
			borderRadius: borderRadius["border-radius-3"],
			fontWeight:
				platform == "android"
					? fontWeight["font-weight-4"]
					: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"],
			color: colour["colour-text-input-default"],
			lineHeight: 18.75,
			paddingLeft: 14,
		},
		circle: {
			position: "absolute",
			right: 18 * ratioY
		},
		warningIcon: {
			position: "absolute",
			height: 13,
			width: 14,
			top: 10,
			right: 10,
		},
		error: {
			fontSize: 12,
			lineHeight: lineHeight["line-height-text"],
			color: colour["colour-text-error"],
			marginTop: 8 * ratioY,
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
					finalColor={pageColour}
					radius={15}
					offset={[0, 4]} // originally [0,10]
				>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour}
						radius={6}
						offset={[0, 4]}>
						<View style={styles.container}>
							<TextInput
								value={value}
								editable={editable ?? true}
								placeholderTextColor={colour["colour-text-input-placeholder"]}
								style={styles.input}
								placeholder={placeholder}
								onChangeText={(text) => {
									setText(text);
									if(text.length == maxLength || text.length > minLength){
										setSubmitted(true);
										setValid(true);
										setExtracted(text)
									} else {
										setSubmitted(false);
										setValid(false);
									}
								}}
								onSubmitEditing={({ nativeEvent }) => {
									if (nativeEvent.text.length > 0) {
										setValid(true);
										setExtracted(nativeEvent.text);
									} else {
										setValid(false);
									}
									setSubmitted(true);
								}}
								onEndEditing={({ nativeEvent }) => {
									if (nativeEvent.text.length > 0) {
										setValid(true);
										setExtracted(nativeEvent.text);
									} else {
										setValid(false);
									}
									setSubmitted(true);
								}}
								keyboardType={keyboardType ?? "number-pad"}
								selectionColor="#FFD43C"
								maxLength={maxLength}
							/>
							{editable && (
								<Svg height={12} width={12}>
									<Circle
										r={6}
										cx={6}
										cy={6}
										fill={
											!submitted
												? "#6E7B87"
												: valid
													? "#68D391"
													: colour["colour-input-invalid"]
										}
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
							value={value}
							editable={editable ?? true}
							placeholderTextColor={colour["colour-text-input-placeholder"]}
							style={styles.input}
							placeholder={placeholder}
							onChangeText={(text) => {
								setText(text);
								if(text.length == maxLength || text.length > minLength){
									setSubmitted(true);
									setValid(true);
									setExtracted(text)
								} else {
				 					setSubmitted(false);
									setValid(false);
								}
							}}
							onSubmitEditing={({ nativeEvent }) => {
								if (nativeEvent.text.length > 0) {
									setValid(true);
									setExtracted(nativeEvent.text);
								} else {
									setValid(false);
								}
								setSubmitted(true);
							}}
							onEndEditing={({ nativeEvent }) => {
								if (nativeEvent.text.length > 0) {
									setValid(true);
									setExtracted(nativeEvent.text);
								} else {
									setValid(false);
								}
								setSubmitted(true);
							}}
							keyboardType={keyboardType ?? "number-pad"}
							selectionColor="#FFD43C"
							maxLength={maxLength}
						/>
						{editable && (
							<Svg style={styles.circle} height={12} width={12}>
								<Circle
									r={6}
									cx={6}
									cy={6}
									fill={
										!submitted
											? "#6E7B87"
											: valid
												? "#68D391"
												: colour["colour-input-invalid"]
									}
								/>
							</Svg>
						)}
					</View>
				</View>
			)}
		</>
	);
};

export default InputTextV4;

