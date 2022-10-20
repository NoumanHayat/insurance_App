import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	withSequence,
	withDelay,
	FadeInDown,
	interpolate,
	Easing,
} from "react-native-reanimated";

import LinGradBackground from "../../../components/backgrounds/LinGradBackground";

import GreenCheck from "../../../../assets/animations/verifying/greenCheck.svg";
import LinGradCircle from "../../../components/backgrounds/LinGradCircle";
import UserContext from "../../../context/context";
import AppLayout from "../../../components/layouts/AppLayout";

const Verifying = ({ navigation }) => {
	const [text, setText] = useState("Verifying");

	const { width } = useWindowDimensions();
	const { modelX } = useContext(UserContext);
	const ratioX = width / modelX;

	const widthShared = useSharedValue(0);
	const checkShared = useSharedValue(0);
	const circleShared = useSharedValue(0);
	const clearScreenShared = useSharedValue(1);

	// General styles
	const styles = StyleSheet.create({
		upperPlane: {
			height: 186,
			width: 360,
			justifyContent: "center",
			backgroundColor: "transparent",
			alignItems: "center",
			zIndex: 2,
		},
		lowerPlane: {
			height: 186,
			width: 360,
			backgroundColor: "transparent",
			position: "absolute",
			zIndex: 1,
		},
		lineContainer: {
			height: 96,
			width: 96,
			justifyContent: "center",
			alignItems: "flex-end",
			// borderWidth: 1,
			// borderColor: "#fff",
		},
		line: {
			height: 4,
			width: 92,
			backgroundColor: "#fff",
			borderRadius: 4,
		},
		lineMargin: {
			marginBottom: 14,
		},
		check: {
			position: "absolute",
			top: 55,
			left: 0,
		},
		block: {
			height: 186,
			width: 85,
			position: "absolute",
			left: 0,
			backgroundColor: "#f00",
			zIndex: 3,
			borderColor: "#fff",
			borderWidth: 1,
		},
		circle: {
			height: 187,
			width: 187,
			borderRadius: 93,
			alignSelf: "center",
			position: "absolute",
			borderColor: "#2E76DA",
			borderWidth: 0.5,
		},
		text: {
			position: "absolute",
			// fontFamily: "Roboto",
			fontWeight: "500",
			fontSize: 28,
			lineHeight: 33,
			color: "#fff",
			top: 200,
		},
	});

	// Circle animation styles
	const circleStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ scale: interpolate(circleShared.value, [0, 1], [1, 2.77]) },
				{ translateY: interpolate(circleShared.value, [0, 1], [0, 150]) },
			],
		};
	});

	// Opacity levels for lines
	const opLvlOne = 1;
	const opLvlTwo = 0.4;
	const opLvlThree = 0.2;
	const opLvlFour = 0.1;
	const opLvlFive = 0

	const _line0Opacity = useSharedValue(opLvlOne);
	const _line1Opacity = useSharedValue(opLvlTwo);
	const _line2Opacity = useSharedValue(opLvlThree);
	const _line3Opacity = useSharedValue(opLvlFive);
	
	// Lines animation styles
	const _line0Styles = useAnimatedStyle(() => {
		return {
			opacity: _line0Opacity.value,
			width: (92 - widthShared.value * 4) * ratioX,
		}
	})

	const _line1Styles = useAnimatedStyle(() => {
		return {
			opacity: _line1Opacity.value,
			width: (92 - widthShared.value * 3) * ratioX,
		}
	})

	const _line2Styles = useAnimatedStyle(() => {
		return {
			opacity: _line2Opacity.value,
			width: (92 - widthShared.value * 2) * ratioX,
		}
	})

	const _line3Styles = useAnimatedStyle(() => {
		return {
			opacity: _line3Opacity.value,
			width: (92 - widthShared.value) * ratioX,
		}
	})

	const _changeLineOpacity = (sharedValue, opacities) => {

		const options = {
			duration: 300
		}

		const options2 = {
			duration: 150
		}

		sharedValue.value = withSequence(
			withDelay(0, withTiming(opacities[0], options)),
			withDelay(0, withTiming(opacities[1], options)),
			withDelay(0, withTiming(opacities[2], options)),
			withDelay(0, withTiming(opacities[3], options2)),
			withDelay(0, withTiming(opacities[4], options2)),
			withDelay(0, withTiming(opacities[5], options2)),
		)
	}

	// Check animation styles
	const checkStyles = useAnimatedStyle(() => {
		return {
			left: checkShared.value,
			opacity: interpolate(checkShared.value, [0, 90, 112], [0, 0, 1]),
		};
	});

	// Text animation styles
	const clearScreenStyles = useAnimatedStyle(() => {
		return {
			opacity: clearScreenShared.value,
		};
	});

	const truncateLines = () => {
		widthShared.value = withDelay(
			1350,
			withTiming(14, {
				duration: 1000,
				easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
			})
		);
	};

	const translateCheck = () => {
		checkShared.value = withDelay(
			1350,
			withTiming(112, {
				duration: 1000,
				easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
			})
		);
	};

	const translateCircle = () => {
		circleShared.value = withDelay(
			3350,
			withTiming(1, {
				duration: 1000,
				easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
			})
		);
	};

	const changeText = () => {
		setTimeout(() => {
			setText("Verification Successful");
		}, 1350);

		setTimeout(() => {
			fadeOutText();
			// Fade out check
			checkShared.value = withTiming(0, { duration: 100 })
		}, 3350);

		setTimeout(() => {
			navigation.navigate("DWOnly")
		}, 4000)
	};

	const fadeOutText = () => {
		clearScreenShared.value = withTiming(0, { duration: 500 });
	};

	useEffect(() => {
			_changeLineOpacity(_line0Opacity, [opLvlTwo, opLvlThree, opLvlFour, opLvlThree, opLvlTwo, opLvlOne])
			_changeLineOpacity(_line1Opacity, [opLvlOne, opLvlTwo, opLvlThree, opLvlTwo, opLvlOne, opLvlOne])
			_changeLineOpacity(_line2Opacity, [opLvlTwo, opLvlOne, opLvlTwo, opLvlOne, opLvlOne, opLvlOne]) 
			_changeLineOpacity(_line3Opacity, [opLvlFour, opLvlTwo, opLvlOne, opLvlOne, opLvlOne, opLvlOne])

			truncateLines();
			translateCheck();
			translateCircle();
			changeText();
	}, []);

	return (
		<AppLayout>
			<LinGradBackground justify>
				<View style={styles.upperPlane}>
					<Animated.View
						entering={FadeInDown.duration(500).delay(200)}
						style={[styles.circle, circleStyles]}>
						<LinGradCircle />
					</Animated.View>

					<Animated.View style={[styles.check, checkStyles]}>
						<GreenCheck />
					</Animated.View>

					<Animated.View style={[styles.lineContainer, clearScreenStyles]}>
						<Animated.View	style={[styles.line, styles.lineMargin, _line0Styles]}	/>
						<Animated.View 	style={[styles.line, styles.lineMargin, _line1Styles]}	/>
						<Animated.View 	style={[styles.line, styles.lineMargin, _line2Styles]}	/>
						<Animated.View 	style={[styles.line, _line3Styles]} />
					</Animated.View>

					<Animated.Text style={[styles.text, clearScreenStyles]}>
						{text}
					</Animated.Text>
				</View>
			</LinGradBackground>
		</AppLayout>
	);
};

export default Verifying;
