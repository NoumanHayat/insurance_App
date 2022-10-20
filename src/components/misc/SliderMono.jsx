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
import Slot from "./Slot v2";
import { BIG, SMALL, spacerPos, barWidths } from "../../lib/utils/animation";
import Left from "../animations/Page Indicator/First/Left";
import Middle from "../animations/Page Indicator/First/Middle";
import Right from "../animations/Page Indicator/First/Right";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

const SliderMono = ({
	current,
	leftX2,
	middleX1,
	middleX2,
	rightX2,
	offset,
	increasing,
	button
}) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const prev = usePrevious(current);

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			width: 160,
			height: 4,
			justifyContent: "center",
		},
		spacer: {
			marginLeft: 12,
		},
	});

	return (
		<View style={styles.container}>
			<Left
				index={0}
				current={current}
				previous={prev}
				SV={leftX2}
				offset={offset}
				increasing={increasing}
				button={button}
			/>
			<View style={styles.spacer} />
			<Middle
				index={1}
				current={current}
				previous={prev}
				x1={middleX1}
				x2={middleX2}
				increasing={increasing}
				button={button}
				offset={offset}
			/>
			<View style={styles.spacer} />
			<Right
				index={2}
				current={current}
				previous={prev}
				SV={rightX2}
				offset={offset}
				button={button}
				increasing={increasing}
			/>
		</View>
	);
};

export default SliderMono;
