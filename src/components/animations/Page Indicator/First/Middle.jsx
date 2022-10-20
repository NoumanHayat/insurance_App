import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";
import Animated, {
	useAnimatedProps,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";


const Middle = ({
	current,
	previous,
	x2,
	increasing,
	index,
	offset,
	button,
}) => {
	const AnimatedLine = Animated.createAnimatedComponent(Line);

	const options = {
		duration: 300,
		easing: Easing.ease,
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: x2.value,
		};
	});

	const lineAnimatedProps = useAnimatedProps(() => {
		return {
			x2: x2.value,
		};
	});

	const styles = StyleSheet.create({
		container: {
			borderRadius: 2,
		},
	});

	const _offset = offset ?? (increasing ? 1 : 0);

	useEffect(() => {
		// for RightArrow press
		if (previous == 0 && current == 1) {
			x2.value = withTiming(52, options);
		}
		if (previous == 1 && current == 0) {
			x2.value = withTiming(24, options);
		}
		if (previous == 1 && current == 2) {
			x2.value = withTiming(24, options);
		}
		if (previous == 2 && current == 1) {
			x2.value = withTiming(52, options);
		}
	}, [button]);

	useEffect(() => {
		// for swipe
		if (current == 0 && increasing == true) {
			// going from page 0 to page 1. The current position for this transition sticks. See <Left /> for more details.
			// grow
			x2.value = 24 + _offset * 28;
		} else if (current == 1 && increasing == false) {
			// going from page 2 to page 1
			// grow
			x2.value = 52 - _offset * 28;
		} else if (current == 0 && increasing == false) {
			// going from page 1 to page 0
			// shrink
			x2.value = 24 + _offset * 28;
		} else if (current == 1 && increasing == true) {
			// going from page 1 to page 2
			// shrink
			x2.value = 52 - _offset * 28;
		}
	}, [increasing]);

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<Svg>
				<AnimatedLine
					stroke="#fff"
					strokeWidth="4"
					x1="0"
					y="0"
					animatedProps={lineAnimatedProps}
				/>
			</Svg>
		</Animated.View>
	);
};

export default Middle;
