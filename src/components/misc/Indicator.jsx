import React, { useState, useContext, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	useWindowDimensions,
	Platform,
	Pressable,
} from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";

import UserContext from "../../context/context";
import RightArrow from "../buttons/RightArrow";
import Slot from "./Slot v2";
import { BIG, SMALL, spacerPos, barWidths } from "../../lib/utils/animation";
import Left from "../../components/animations/Page Indicator/Left";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

const keyframe = new Keyframe({
	0: {
		
	},
	100: {

	}
})

const Indicator = ({ pageNumber, setPageNumber, navigation, to }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const prev = usePrevious(pageNumber);

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			width: 160,
			height: 4,
			marginTop: 52 * ratioY
		},
		bar: {
			backgroundColor: "#FFFF00",
			borderColor: "#FFFF00",
			borderRadius: 4
		},
		bar1: {
			width: BIG,
		},
		bar2: {
			width: SMALL,
			backgroundColor: "#002963"
		},
		bar3: {
			width: SMALL,
			backgroundColor: "#002963"
		},
		spacer: {
			width: "8%",
		},
	});

	return (
				<View style={styles.container}>
					{/* <Animated.View  style={[styles.bar, styles.bar1]} />
					<Animated.View style={styles.spacer} />
					<Animated.View style={[styles.bar, styles.bar2]} />
					<Animated.View style={styles.spacer} />
					<Animated.View style={[styles.bar, styles.bar3]} /> */}
					<Left />
				</View>
	);
};

export default Indicator;
