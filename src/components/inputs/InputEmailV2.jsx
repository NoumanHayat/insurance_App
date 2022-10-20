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
import { emailFilter2 } from "../../lib/utils/input validation/email address";


const InputEmailV2 = ({
	placeholder,
	pageColour,
	// setText,
	editable,
	valid,
	setValid,
	setExtracted,
    BGColor
}) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const [submitted, setSubmitted] = useState(false);
	const [text, setText] = useState("");

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
			backgroundColor: BGColor === true ? "#4B5563" : editable ? "#374151" : "#111827",
			borderRadius: borderRadius["border-radius-3"],
			fontWeight: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			color: editable ? "#B3BDC6" : colour["colour-text-input-default"],
			lineHeight: 18.75 * ratioY,
			paddingLeft: 14 * ratioY,
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
								editable={editable ?? true}
								placeholderTextColor={colour["colour-text-input-placeholder"]}
								style={styles.input}
								placeholder={placeholder}
								value={text}
								onChangeText={(text) => {
									setText(text);
									setSubmitted(true);
									if(emailFilter2(text)){
										setValid(true);
										setExtracted(text);
									} else {
										setValid(false);
										setSubmitted(false);
									}
								}}
								onSubmitEditing={({ nativeEvent }) => {
									if (emailFilter2(nativeEvent.text)) {
										setValid(true);
										setExtracted(nativeEvent.text);
										setSubmitted(true);
									} else {
										setValid(false);
										setSubmitted(true);
									}
								}}
								onEndEditing={({ nativeEvent }) => {
									if(nativeEvent.text.length > 0){
										if (emailFilter2(nativeEvent.text)) {
											setValid(true);
											setExtracted(nativeEvent.text);
										} else {
											setValid(false);
										}
										setSubmitted(true);
									}
		
								}}
								keyboardType="email-address"
								multiline={false}
							/>
							{editable && (
								<Svg style={styles.circle} height={12 * ratioY} width={12 * ratioY}>
									<Circle
										r={6 * ratioY}
										cx={6 * ratioY}
										cy={6 * ratioY}
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
				<View style={[styles.container, styles.shadow2, styles.shadow1]}>
					<TextInput
						editable={editable ?? true}
						placeholderTextColor={colour["colour-text-input-placeholder"]}
						style={styles.input}
						placeholder={placeholder}
						value={text}
						onChangeText={(text) => {
							setText(text);
							setSubmitted(true);
							if(emailFilter2(text)){
								setValid(true);
								setExtracted(text);
							} else {
								setValid(false);
								setSubmitted(false);
							}
						}}
						onSubmitEditing={({ nativeEvent }) => {
							if (emailFilter2(nativeEvent.text)) {
								setValid(true);
								setExtracted(nativeEvent.text);
								setSubmitted(true);
							} else {
								setValid(false);
								setSubmitted(true);
							}
						}}
						onEndEditing={({ nativeEvent }) => {
							if(nativeEvent.text.length > 0){
								if (emailFilter2(nativeEvent.text)) {
									setValid(true);
									setExtracted(nativeEvent.text);
								} else {
									setValid(false);
								}
								setSubmitted(true);
							}

						}}
						keyboardType="email-address"
						multiline={false}
					/>
					{editable && (
						<Svg style={styles.circle} height={12 * ratioY} width={12 * ratioY}>
							<Circle
								r={6 * ratioY}
								cx={6 * ratioY}
								cy={6 * ratioY}
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
			)}
		</>
	);
};

export default InputEmailV2;
