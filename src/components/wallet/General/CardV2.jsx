import React, { useContext } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

import UserContext from "../../../context/context";

const Card = ({ children }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
            // alignSelf: "stretch",
			width: "100%",
			backgroundColor: "#fff",
			borderRadius: 4,
			paddingVertical: 17 * ratioY,
			paddingHorizontal: 16 * ratioX,
			borderBottomWidth: 4,
			borderBottomColor: "#B3BDC6",
			zIndex: 3,
		},
	});

	return <View style={styles.container}>{children}</View>;
};

export default Card;
