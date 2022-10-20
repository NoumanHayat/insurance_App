import React, { useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Animated, Easing, useWindowDimensions } from "react-native";

import UserContext from "../../context/context";


const LoadingBar = ({ navigation, height, width, backgroundColor, to }) => {

	const { width: _width } = useWindowDimensions();
	const { modelX } = useContext(UserContext);
	const ratioX = _width / modelX;

	const styles = StyleSheet.create({
		barContainer: {
			backgroundColor: backgroundColor ?? "#073372",
			borderRadius: 4,
			// alignSelf: "stretch",
			height: height ?? 4,
			width: width ?? 278 * ratioX,
		},
		bar: {
			height: 0,
			borderColor: "#FFD53D",
			borderWidth: height ? height / 2 : 2,
			borderRadius: 4,
			backgroundColor: "#FFD53D",
		},
	});

	const progressWidth = new Animated.Value(0);
	const progressRef = useRef(progressWidth);

	const getStartingAnimation = () => {
		const animation = Animated.timing(progressRef.current, {
			toValue: 1,
			Easing: Easing.linear,
			duration: 5000,
			useNativeDriver: false,
		});

		return animation;
	};

	const animatedWidth = progressRef.current.interpolate({
		inputRange: [0, 1],
		outputRange: [0, styles.barContainer.width],
	});

	const startingAnim = getStartingAnimation();

	useEffect(() => {
			startingAnim.start(() => {
				navigation.navigate(to);
			})
	}, []);

	return (
		<View style={styles.barContainer}>
			<Animated.View style={[styles.bar, { width: animatedWidth }]} />
		</View>
	);
};

export default LoadingBar;
