import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay
} from "react-native-reanimated";

const ProgressBar = ({ period, startDate, endDate }) => {
	const styles = StyleSheet.create({
		barContainer: {
			backgroundColor: "#353B40",
			borderRadius: 4,
			height: 4,
			width: "100%",
		},
		bar: {
			height: 0,
			borderColor: period > 0 ? "#FFD53D" : "#F87171",
			borderWidth: 2,
			borderRadius: 4,
		},
	});

	const total = (new Date(endDate) - new Date(startDate)) / 86400000;
	const daysElapsed = (new Date() - new Date(startDate)) / 86400000;
	let progress = daysElapsed / total;

	if(progress > 1) progress = 1;

	const barWidthShared = useSharedValue("5%");
	const barStyles = useAnimatedStyle(() => {
		return {
			width: barWidthShared.value,
		};
	});

	const options = {
		duration: 2000,
	};

	useEffect(() => {
		barWidthShared.value = withDelay(1000, withTiming(
			(progress * 100).toString() + "%",
			options
		));
	}, []);

	return (
		<View style={styles.barContainer}>
			<Animated.View style={[styles.bar, barStyles]} />
		</View>
	);
};

export default ProgressBar;
