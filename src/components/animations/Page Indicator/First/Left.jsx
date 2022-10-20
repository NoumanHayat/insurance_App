import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";
import Animated, {
	useAnimatedProps,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";


const Left = ({ current, previous, SV, index, offset, increasing, button }) => {
	const AnimatedLine = Animated.createAnimatedComponent(Line);

	const lineAnimatedProps = useAnimatedProps(() => {
		return {
			x2: SV.value,
		};
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: SV.value,
		};
	});

	const options = {
		duration: 300,
		easing: Easing.ease,
	};

	const _offset = offset ?? (increasing ? 1 : 0);

	useEffect(() => {
		// for rightArrow press
		if (current == 0 && previous != 0) {
			SV.value = withTiming(52, options);
		} else if (current != 0 && previous == 0) {
			SV.value = withTiming(24, options);
		}
	}, [button]);

	useEffect(() => {
		// for swipe
		if (current == 0 && increasing == true) {
			// going from page 0 to page 1. This page is special because the 'current' value sticks (remains as 0) longer than the others.
			// shrink
			SV.value = 52 - _offset * 28;
		} else if (current == 0 && increasing == false) {
			// coming from page 1 to page 0. The current value changes to 0 much faster when coming from page 1
			// grow
			SV.value = 52 - _offset * 28;
		}
	}, [increasing]);

	return (
		<Animated.View style={animatedStyle}>
			<Svg>
				<AnimatedLine
					stroke="#fff"
					strokeWidth="4"
					strokeLinecap="round"
					y="0"
					x1="0"
					animatedProps={lineAnimatedProps}
				/>
			</Svg>
		</Animated.View>
	);
};

export default Left;
