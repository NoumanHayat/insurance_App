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
import { isNumeric } from "../../lib/utils/input validation/general";
import { addDelimiterToString } from "../../lib/utils/input validation/general";

const InputTRN = ({
	pageColour,
	editable,
	valid,
	setValid,
	onFocus,
	hidePopup,
	setValue,
	value
}) => {
	const { height } = useWindowDimensions();
	const { modelY, platform, } = useContext(UserContext);
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			justifyContent: "center",
			width: "100%",
			flex: 1
		},
		shadow1: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 10,
			},
			shadowRadius: 15,
			shadowOpacity: 0.12,
			width: "100%",
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
					offset={[0, 4]}
					viewStyle={{ flex: 1, width: "100%" }}
				>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour}
						radius={6}
						offset={[0, 4]}
						viewStyle={{ flex: 1, width: "100%" }}
					>
						<View style={styles.container}>
							<Content
								editable={editable}
								valid={valid}
								setValid={setValid}
								onFocus={onFocus}
								hidePopup={hidePopup}
								setValue={setValue}
								value={value}
							/>
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={[styles.container, styles.shadow2]}>
						<Content
							editable={editable}
							valid={valid}
							setValid={setValid}
							onFocus={onFocus}
							hidePopup={hidePopup}
							setValue={setValue}
							value={value}
						/>
					</View>
				</View>
			)}
		</>
	);
};

export default InputTRN;

const Content = ({
	editable,
	valid,
	setValid,
	onFocus,
	hidePopup,
	setValue,
	value 
}) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform, } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const [submitted, setSubmitted] = useState(false);

	const styles = StyleSheet.create({
		input: {
			position: "absolute",
			height: "100%",
			width: "100%",
			borderWidth: 1,
			borderColor:
				submitted && !valid
					? colour["colour-input-invalid"]
					: colour["colour-border-input-default"],
			backgroundColor: colour["colour-background-input"],
			borderRadius: borderRadius["border-radius-3"],
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			color: colour["colour-text-input-default"],
			lineHeight: 18.75,
			paddingLeft: 14 * ratioX,
		},
		error: {
			fontSize: 12,
			lineHeight: lineHeight["line-height-text"],
			color: colour["colour-text-error"],
			marginTop: 8 * ratioY,
		},
		circle: {
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "37.5%", // 18px / 48px
			right: "5%", // 18px / 342px
			zIndex: 3,
			flex: 1,
			width: 12,
			height: 12,
		}
	});

	const onChangeText = (text) => {
		if (text.length == 9) {
			setSubmitted(true);
			if (isNumeric(text)) {
				setValid(true);
				setValue(text);
			} else {
				setValid(false);
			}
		} else {
			setSubmitted(false)
			if(isNumeric(text)){
				setValue(addDelimiterToString(text, 3, "-"))
			}
		}
	}

	const onSubmitEditing = ({ nativeEvent }) => {
		hidePopup();
		setSubmitted(true);
		if (
			isNumeric(nativeEvent.text) &&
			nativeEvent.text.length == 9
		) {
			setValue(nativeEvent.text);
			setValid(true);
		} else {
			setValid(false);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<TextInput
				onFocus={onFocus}
				editable={editable ?? true}
				placeholderTextColor={colour["colour-text-input-placeholder"]}
				style={styles.input}
				placeholder="TRN or Driver's License"
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				onEndEditing={onSubmitEditing}
				keyboardType="number-pad"
				maxLength={9}
				multiline={false}
				// value={value}
			/>
			{editable && (
				<View style={styles.circle}>
					<Svg height={12} width={12}>
						<Circle
							r={6}
							cx={6}
							cy={6}
							fill={
								submitted
									? valid
										? "#68D391"
										: colour["colour-input-invalid"]
									: "#6E7B87"
							}
						/>
					</Svg>
				</View>
			)}
		</View>
	)
}
