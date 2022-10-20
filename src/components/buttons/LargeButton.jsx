import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { colour } from "../../styles/global";

const LargeButton = ({
	text,
	disabled,
	width,
	height,
	navigation,
	to,
	background,
	textColor,
	borderRadius,
	fontSize
}) => {
	let backgroundColor;
	if (background) {
		backgroundColor = background;
	} else {
		backgroundColor = disabled ? colour["colour-background-button--disabled"] : colour["colour-background-button--active"];
	}

	const styles = StyleSheet.create({
		button: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			height: height ?? 35,
			padding: 8,
			borderRadius: borderRadius,
			backgroundColor: backgroundColor
		},
		text: {
			fontSize: fontSize ?? 16,
			lineHeight: 19.36,
			color: textColor ?? colour["colour-text-button"],
		},
	});

	return (
		<Pressable
			disabled={disabled}
			onPress={() => navigation.navigate(to)}
			style={[styles.button, { backgroundColor, width, }]}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	);
};



export default LargeButton;
