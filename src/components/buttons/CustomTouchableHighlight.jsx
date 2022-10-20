import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	withRepeat,
	Easing,
} from "react-native-reanimated";

const CustomTouchableHighlight = ({
	text,
	textColor,
	backgroundColor,
	width,
	height,
	borderRadius,
	fontSize,
	disabled,
	pressed,
	animation,
	prelim,
}) => {
	const styles = StyleSheet.create({
		text: {
			color: disabled ? (prelim ? "#9CA3AF" : "#6B7280") : textColor,
			fontSize: fontSize,
			fontWeight: "700",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: pressed ? undefined : "center",
			width: width ?? "100%",
			height: height,
			borderRadius: borderRadius,
			backgroundColor: disabled ? (prelim ? "#4B5563" : "#374151") : backgroundColor,
		},
		ball: {
			height: 6,
			width: 6,
			borderRadius: 3,
			backgroundColor: "#fff",
		},
		ballsContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			width: 26,
		},
		alignBalls: {
			alignItems: "center"
		}
	});

	const endsSharedPosition = useSharedValue(0);
	const sharedOpacity = useSharedValue(0);

	const endsStyles = useAnimatedStyle(() => {
		return {
			opacity: sharedOpacity.value,
			transform: [{ translateY: endsSharedPosition.value }],
		};
	});

	const middleStyles = useAnimatedStyle(() => {
		return {
			opacity: sharedOpacity.value,
			transform: [{ translateY: -endsSharedPosition.value }]
		}
	})

	const options = { duration: 350, easing: Easing.bezier(0.42, 0, 0.58, 1) };

	const animateBalls = () => {
		sharedOpacity.value = 1;
		endsSharedPosition.value = withDelay(
			1000,
			withRepeat(
				withSequence(withTiming(-4, options), withTiming(4, options)), 20, true
			)
		);
	};

	useEffect(() => {
		animateBalls();
	}, [pressed]);

	return (
		<View style={[styles.buttonContainer, animation && styles.alignBalls]}>
			{!pressed && <Text style={styles.text}>{text}</Text>}
			{(pressed && animation) &&
				<View style={styles.ballsContainer}>
					<Animated.View style={[styles.ball, endsStyles]} />
					<Animated.View style={[styles.ball, middleStyles]} />
					<Animated.View style={[styles.ball, endsStyles]} />
				</View>
			}
		</View>
	);
};

export default CustomTouchableHighlight;
