import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import Loading from "../../../assets/loading.svg";

const LoadingCircle = ({ navigation, to }) => {
	const animatedVal = new Animated.Value(0);

	const animatedInterpolated = animatedVal.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const animate = () => {
		Animated.timing(animatedVal, {
			toValue: 1,
			easing: Easing.linear,
			duration: 3000,
			useNativeDriver: false, //to be changed
		}).start(() => navigation.navigate(to));
	};

	useEffect(() => animate(), []);
	
	const styles = StyleSheet.create({
		loading: {
			height: 100,
			width: 100,
		},
		image: {
			transform: [{ rotate: animatedInterpolated }]
		}
	});

	return (
		<Animated.View style={styles.image}>
			<Loading style={styles.loading} />
		</Animated.View>
	);
};



export default LoadingCircle;
