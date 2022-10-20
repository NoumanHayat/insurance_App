import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

const CardFrame = ({ children }) => {

	const styles = StyleSheet.create({
		outer: {
			
			shadowColor: "rgba(0,0,0,0.08)",
			shadowOffset: { width: 0, width: 2},
			shadowRadius: 4,
		},
		inner: {
			paddingHorizontal: 8,
			paddingTop: 8,
			paddingBottom: 10,
			width: "100%",
			borderRadius: 12,
			borderColor: "#F6F8F8",
			backgroundColor: "#F6F8F8",
			borderWidth: StyleSheet.hairlineWidth,
			shadowColor: "rgba(0,0,0,0.12)",
			shadowOffset: { width: 0, height: 4 },
			shadowRadius: 6
		}
	});
	

	return (
		<View style={styles.outer}>
			<View style={styles.inner}>{children}</View>
		</View>
	);
};


export default CardFrame;
