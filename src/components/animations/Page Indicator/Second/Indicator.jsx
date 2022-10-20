import React, { useContext } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Svg, Line } from "react-native-svg";
import Animated, {
	useAnimatedProps,
	useDerivedValue,
} from "react-native-reanimated";

import UserContext from "../../../../context/context";
import interpolateColorBugFix from "../../../../lib/utils/interpolateColorBugFix";

const AnimatedLine = Animated.createAnimatedComponent(Line);

const Indicator = ({
	x1,
	x2,
	line1FinalColour,
	line2FinalColour,
	line3FinalColour,
	inModal,
}) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			width: 124 * ratioX,
			height: 4 * ratioY,
		},
	});

	const dark = inModal ? "#9CA3AF" : "#002963";
	const line1Final = line1FinalColour ?? "#FFD53D";
	const line2Final = line2FinalColour ?? "#FFD53D";
	const line3Final = line3FinalColour ?? "#FFD53D";

	const derivedLine2 = useDerivedValue(() => {
		return x2.value - x1.value - 10;
	});

	// Animated props for the lines
	const line1Props = useAnimatedProps(() => {
		return {
			x2: x1.value,
			stroke: interpolateColorBugFix(x1.value, [24, 52], [dark, line1Final])
		};
	});

	const line2Props = useAnimatedProps(() => {
		return {
			x1: x1.value + 10,
			x2: x2.value,
			stroke: interpolateColorBugFix(derivedLine2.value, [24,52], [dark, line2Final])
		};
	});

	const line3Props = useAnimatedProps(() => {
		return {
			x1: x2.value + 10,
			stroke: interpolateColorBugFix(x2.value, [58, 86], [line3Final, dark])
		};
	});

	return (
		<View style={styles.container}>
			<Svg height="8" width="124">
				<AnimatedLine
					strokeWidth="4"
					strokeLinecap="round"
					y="4"
					x1="2"
					animatedProps={line1Props}
				/>
				<AnimatedLine
					strokeWidth="4"
					strokeLinecap="round"
					y="4"
					animatedProps={line2Props}
				/>
				<AnimatedLine
					strokeWidth="4"
					strokeLinecap="round"
					y="4"
					x2="120"
					animatedProps={line3Props}
				/>
			</Svg>
		</View>
	);
};

export default Indicator;
