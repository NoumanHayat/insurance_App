import React, { useContext, useState } from "react";
import {
	TextInput,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import { Svg, Circle } from "react-native-svg";

import CustomBoxShadow from "../shadows/CustomBoxShadow";
import {
	borderRadius,
	colour,
	fontSize,
	fontWeight,
} from "../../styles/global";

import UserContext from "../../context/context";

const InputText = ({
	keyboardType,
	placeholder,
	pageColour,
	editable,
	setExtracted,
	valid,
	setValid,
	inputValidationFilters,
	minLength,
	maxLength
}) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	// eslint-disable-next-line
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			width: "100%"
		},
		content: {
			flex: 1,
			justifyContent: "center",
		}
	});

	return (
		<View style={styles.container}>
			<CustomBoxShadow pageColor={pageColour}>
				<View style={styles.content}>
					<Content
						keyboardType={keyboardType}
						placeholder={placeholder}
						editable={editable}
						setExtracted={setExtracted}
						valid={valid}
						setValid={setValid}
						inputValidationFilters={inputValidationFilters}
						minLength={minLength}
						maxLength={maxLength}
					/>
				</View>
			</CustomBoxShadow>
		</View>
	);
};

const Content = ({
	keyboardType,
	placeholder,
	editable,
	setExtracted,
	valid,
	setValid,
	inputValidationFilters,
	minLength,
	maxLength
}) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	// eslint-disable-next-line
	const ratioY = height / modelY;
	// eslint-disable-next-line
	const [submitted, setSubmitted] = useState(false);

	const styles = StyleSheet.create({
		input: {
			position: "absolute",
			height: "100%",
			width: "100%",
			borderWidth: 1,
			borderColor:
				submitted && valid == false
					? colour["colour-input-invalid"]
					: colour["colour-border-input-default"],
			backgroundColor: colour["colour-background-input"],
			borderRadius: borderRadius["border-radius-3"],
			fontWeight:
				platform == "android"
					? fontWeight["font-weight-4"]
					: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"],
			color: colour["colour-text-input-default"],
			lineHeight: 18.75,
			paddingLeft: 14 * ratioX,
		},
		circle: {
			alignSelf: "flex-end",
			marginRight: 18 * ratioX
		}
	});

	const onChangeText = (text) => {
		if ((minLength && text.length < minLength) || text.length == 0 || text.startsWith(' ')) {
			setValid(undefined);
			setSubmitted(false);
			setExtracted(undefined)
			return;
		}
		const results = inputValidationFilters.map(filter => filter(text))
		if (results.every(result => result == true)) {
			setValid(true);
			setExtracted(text)
		} else {
			setValid(false);
			setExtracted(undefined);
		}
		if (text.length == maxLength || text.length >= minLength) {
			setSubmitted(true)
		} else {
			setSubmitted(false);
		}
	}

	const onSubmitEditing = ({ nativeEvent }) => {
		if (nativeEvent.text.length > 0) {
			onChangeText(nativeEvent.text);
		}
	}

	const onEndEditing = onSubmitEditing;

	return (
		<>
			<TextInput
				editable={editable ?? true}
				placeholderTextColor={colour["colour-text-input-placeholder"]}
				style={styles.input}
				placeholder={placeholder}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				onEndEditing={onEndEditing}
				keyboardType={keyboardType ?? "number-pad"}
				selectionColor="#FFD43C"
				maxLength={maxLength}
			/>
			{
				editable && (
					<Svg style={styles.circle} height={12} width={12}>
						<Circle
							r={6}
							cx={6}
							cy={6}
							fill={
								!submitted || valid == undefined
									? "#6E7B87"
									: valid 
										? "#68D391"
										: colour["colour-input-invalid"]
							}
						/>
					</Svg>
				)
			}
		</>
	)

}

export default InputText;

