import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";
import Animated, {
	useAnimatedProps,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";


const Right = ({
	current,
	previous,
	SV,
	index,
	offset,
	increasing,
	button,
}) => {
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
		if (current == 1 && previous != 1) {
			SV.value = withTiming(52, options);
		} else if (current != 1 && previous == 1) {
			SV.value = withTiming(24);
		}
	}, [button]);

	useEffect(() => {
		// for swipe
		if (current == 1 && increasing == true) {
			// grow
			SV.value = 24 + _offset * 28;
		} else if (current == 1 && increasing == false) {
			// shrink
			SV.value = 24 + _offset * 28;
		} else if (current == 2 && increasing == true) {
			SV.value = 52;
			console.log("You've reached the end. ");
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

export default Right;
