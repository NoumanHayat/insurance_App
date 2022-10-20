import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Slot = ({ index, pageNumber, prev, left }) => {
	const [state, setState] = useState("shrinking");

	const styles = StyleSheet.create({
		slot: {
			position: "absolute",
			left,
			height: 2,
			width: 24,
			backgroundColor: "#FFD43B",
		},
	});

	const animatedWidth = new Animated.Value(0);

	const intGrow = animatedWidth.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 1.5],
	});

	const intShrink = animatedWidth.interpolate({
		inputRange: [0, 1],
		outputRange: [1.5, 1],
	});

	const updateState = () => {
		if (prev == index) {
			setState("shrinking");
		} else if (pageNumber == index) {
			setState("growing");
		} else {
			setState("shrunk");
		}
	};

	const animate = () => {
		Animated.timing(animatedWidth, {
			toValue: 1,
			Easing: Easing.linear,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			if (state == "growing") {
				setState("grown");
			} else if (state == "shrinking") {
				setState("shrunk");
			}
		});
	};

	useEffect(() => {
		updateState();
	}, [pageNumber]);

	animate();

	return (
		<Animated.View
			style={[
				styles.slot,
				state == "growing" && { transform: [{ scaleX: intGrow }] },
				state == "shrinking" && { transform: [{ scaleX: intShrink }] },
				state == "grown" && { width: 24 * 1.5 },
			]}
		/>
	);
};

export default Slot;
