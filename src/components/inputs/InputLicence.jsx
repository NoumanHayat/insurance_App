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
import {  universalLicenceFilter } from "../../lib/utils/input validation/motor vehicle licence";

const InputLicence = ({
	placeholder,
	pageColour,
	editable,
	valid,
	setValid,
	setExtracted,
}) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			justifyContent: "center",
			paddingLeft: 312 * ratioX,
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
					offset={[0, 4]}
				>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour}
						radius={6}
						offset={[0, 4]}>
						<View style={styles.container}>
							<Content placeholder={placeholder} editable={editable} valid={valid} setValid={setValid} setExtracted={setExtracted} />
						</View>
					</Shadow>
				</Shadow>
			) : (
				<View style={styles.shadow1}>
					<View style={[styles.container, styles.shadow2]}>
						<Content placeholder={placeholder} editable={editable} valid={valid} setValid={setValid} setExtracted={setExtracted} />
					</View>
				</View>
			)}
		</>
	);
};

export default InputLicence;

const Content = ({
	placeholder,
	editable,
	valid,
	setValid,
	setExtracted,
}) => {

	const {  width } = useWindowDimensions();
	const { modelX, platform } = useContext(UserContext);
	const ratioX = width / modelX;

	const [submitted, setSubmitted] = useState(false);
	const [text, setText] = useState("");

	const styles = StyleSheet.create({
		input: {
			position: "absolute",
			height: "100%",
			width: 342 * ratioX,
			borderWidth: 1,
			borderColor: colour["colour-border-input-default"],
			backgroundColor: colour["colour-background-input"],
			borderRadius: borderRadius["border-radius-3"],
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"],
			color: colour["colour-text-input-default"],
			lineHeight: 18.75,
			paddingLeft: 14 * ratioX,
		},
	});

	return (
		<>
			<TextInput
				editable={editable ?? true}
				placeholderTextColor={colour["colour-text-input-placeholder"]}
				style={styles.input}
				placeholder={placeholder}
				value={text}
				onChangeText={(text) => {
					setText(text.toUpperCase());
					if (text.length == 6) {
						setSubmitted(true);
						if (universalLicenceFilter(text)) {
							setValid(true);
							setExtracted(text.toUpperCase());
						} else {
							setValid(false)
						}
					} else {
						setSubmitted(false)
					}
				}}
				onSubmitEditing={({ nativeEvent }) => {
					if (universalLicenceFilter(nativeEvent.text)) {
						setValid(true);
						setExtracted(nativeEvent.text.toUpperCase());
						setSubmitted(true);
					} else {
						setValid(false);
						setSubmitted(true);
					}
				}}
				keyboardType="default"
				maxLength={6}
				multiline={false}
				selectionColor="#FFD43C"
			/>
			{editable && (
				<Svg height={12} width={12}>
					<Circle
						r={6}
						cx={6}
						cy={6}
						fill={
							!submitted ? "#6E7B87" : (valid
								? "#68D391"
								: colour["colour-input-invalid"])
						}
					/>
				</Svg>
			)}

		</>
	)



}