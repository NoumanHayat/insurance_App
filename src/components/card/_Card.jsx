import React, { useContext } from "react";
import {
	View,
	StyleSheet,
    useWindowDimensions,
} from "react-native";

import UserContext from "../../context/context";

const Card = ({ children }) => {

    const { height, width } = useWindowDimensions();
	const { modelY, modelX, statusBarHeight } = useContext(UserContext);
	const ratioY = height / modelY;
	const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
			flex: 1,
			width: "100%",
			borderRadius: 8,
			paddingTop: 32 * ratioY,
			paddingHorizontal: 20 * ratioX,
			borderColor: "#fff",
			borderWidth: 1,
			backgroundColor: "#fff",
			marginBottom: 12 * ratioY,
			marginTop: 24 * ratioY + statusBarHeight
			
		},
    });


    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

export default Card;
