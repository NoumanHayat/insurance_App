import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
    useWindowDimensions,
} from "react-native";

import UserContext from "../../context/context";

const CardV2 = ({ children, marginBottom }) => {

    const { height, width, scale, fontScale } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
			width: "100%",
			backgroundColor: "#374151",
			borderRadius: 8,
			marginBottom: marginBottom,
		},
		innerContainer: {
			width: "100%",
			marginBottom: 3 * ratioY,
			backgroundColor: "#4B5563",
			borderRadius: 8,
			// paddingTop: "4%",
			// paddingLeft: "4%",
			// paddingRight: "2%",
			// paddingBottom: "4%",

			paddingVertical: "4%",
			paddingHorizontal: "5%",
		},
    });

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>{children}</View>
        </View>
    );
}

export default CardV2;
