import React from "react";
import { Text, StyleSheet } from "react-native";

import { colour, fontSize, lineHeight } from "../../styles/global";

const TextBlock = ({ text, backgroundColor, textColor }) => {
	const styles = StyleSheet.create({
		text: {
			backgroundColor: backgroundColor ?? colour["colour-background-info"],
			padding: 8,
			fontSize: fontSize["font-size-1"],
			// fontFamily: "Roboto",
			fontStyle: "italic",
			lineHeight: lineHeight["line-height-heading"],
			fontStyle: "italic",
			color: textColor ?? colour["colour-text-body-default"],
		},
	});

	return (
		<Text
			style={[
				,
				{
					color: textColor,
					backgroundColor,
				},
				styles.text,
			]}>
			{text}
		</Text>
	);
};

export default TextBlock;
