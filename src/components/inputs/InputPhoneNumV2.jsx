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
} from "../../styles/global";

import UserContext from "../../context/context";
import { phoneNumFilterStage1, phoneNumFilterStage2, phoneNumFilterStage3 } from "../../lib/utils/input validation/phone numbers";

const InputPhoneNum = ({
	placeholder,
	pageColour,
	editable,
	valid,
	setValid,
	setExtracted,
	index
}) => {
	const { height } = useWindowDimensions();
	const { modelY, platform } = useContext(UserContext);
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			width: "100%",
			justifyContent: "center",
			alignItems: "flex-end"
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
							<Content
								placeholder={placeholder}
								editable={editable}
								valid={valid}
								setValid={setValid}
								setExtracted={setExtracted}
								index={index}
							/>
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={[styles.container, styles.shadow2, styles.shadow1]}>
					<Content
						placeholder={placeholder}
						editable={editable}
						valid={valid}
						setValid={setValid}
						setExtracted={setExtracted}
						index={index}
					/>
				</View>
			)}
		</>
	);
};

export default InputPhoneNum;

const Content = ({
	placeholder,
	editable,
	valid,
	setValid,
	setExtracted,
	index
}) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	// eslint-disable-next-line
	const [text, setText] = useState("");
	const [submitted, setSubmitted] = useState(false);

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
			backgroundColor: editable ? "#374151" : "#111827",
			borderRadius: borderRadius["border-radius-3"],
			fontWeight: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			color: editable ? "#B3BDC6" : colour["colour-text-input-default"],
			lineHeight: 18.75 * ratioY,
			paddingLeft: 14 * ratioX,
		},
		circle: {
			position: "absolute",
			right: 18 * ratioY
		},
	});




	return (
		<>
			<TextInput
				editable={editable}
				placeholderTextColor={colour["colour-text-input-placeholder"]}
				style={styles.input}
				placeholder={placeholder}
				onChangeText={(text) => {
					setText(text);
					const res1 = phoneNumFilterStage1(text);
					const res2 = phoneNumFilterStage2(text);
					if (res1 && res2.valid) {
						const { valid, phoneNumber } = phoneNumFilterStage3(res2.modString1);
						if (valid) {
							setExtracted(phone_numbers => {
								let temp = [...phone_numbers];
								let obj = {...temp[index]}
								obj.phone_number = phoneNumber;
								temp[index] = obj;
								return temp;
							});
							setValid(valids => {
								let temp = [...valids];
								temp[index] = valid;
								return temp;
							})
						} else {
							setValid(valids => {
								let temp = [...valids];
								temp[index] = false;
								return temp;
							})
						}
						setSubmitted(true);
					} else {
						setSubmitted(false);
					}
				}}
				keyboardType="number-pad"
				onSubmitEditing={({ nativeEvent }) => {
					const res1 = phoneNumFilterStage1(nativeEvent.text);
					const res2 = phoneNumFilterStage2(nativeEvent.text);
					if (res1 && res2.valid) {
						const { valid, phoneNumber } = phoneNumFilterStage3(res2.modString1);
						if (valid) {
							setExtracted(phone_numbers => {
								let temp = [...phone_numbers];
								let obj = {...temp[index]}
								obj.phone_number = phoneNumber;
								temp[index] = obj;
								return temp;
							});
							setValid(valids => {
								let temp = [...valids];
								temp[index] = valid;
								return temp;
							})
						} else {
							setValid(valids => {
								let temp = [...valids];
								temp[index] = valid;
								return temp;
							})
						}
					} else {
						setValid(valids => {
							let temp = [...valids];
							temp[index] = false;
							return temp;
						})
					}
					setSubmitted(true);
				}}
				onEndEditing={({ nativeEvent }) => {
					if (nativeEvent.text.length > 0) {
						const res1 = phoneNumFilterStage1(nativeEvent.text);
						const res2 = phoneNumFilterStage2(nativeEvent.text);
						if (res1 && res2.valid) {
							const { valid, phoneNumber } = phoneNumFilterStage3(res2.modString1);
							if (valid) {
								setExtracted(phone_numbers => {
									let temp = [...phone_numbers];
									let obj = {...temp[index]}
									obj.phone_number = phoneNumber;
									temp[index] = obj;
									return temp;
								});
								setValid(valids => {
									let temp = [...valids];
									temp[index] = valid;
									return temp;
								})
							} else {
								setValid(valids => {
									let temp = [...valids];
									temp[index] = valid;
									return temp;
								})
							}
						} else {
							setValid(valids => {
								let temp = [...valids];
								temp[index] = false;
								return temp;
							})
						}
						setSubmitted(true);
					}
				}}
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
								: valid[index]
									? "#68D391"
									: colour["colour-input-invalid"]
						}
					/>
				</Svg>
			)}
		</>
	)
}
