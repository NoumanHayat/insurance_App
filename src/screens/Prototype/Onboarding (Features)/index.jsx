import React, { useContext, useRef } from "react";
import { View, StyleSheet, useWindowDimensions, Pressable } from "react-native";
import { Svg, Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";
import { useSelector } from "react-redux";
import Animated, { useSharedValue, FadeOut } from "react-native-reanimated";

import { getAuthStatus } from "../../../../store/v2/slices/session";
import UserContext from "../../../context/context";
import LinGradBackground from "../../../components/backgrounds/LinGradBackground";
import { borderRadius } from "../../../styles/global";

import RightArrow from "../../../components/buttons/RightArrow";
import Indicator from "../../../components/animations/Page Indicator/Second/Indicator";

import FeaturesX from "./FeaturesX";
import { copy } from "../../../copy/features";

import _Feature0 from "../../../../assets/onboarding/onboarding-digital-wallet-updated.svg"
import _Feature1 from "../../../../assets/onboarding/onboarding-my-policies-updated.svg"
import _Feature2 from "../../../../assets/onboarding/onboarding-your-coverage-updated.svg"

import Carousel from "../../../components/carousels/CarouselV2";
import AppLayout from "../../../components/layouts/AppLayout";

const Features = ({ navigation }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const isAuthenticated = useSelector(getAuthStatus);

	const carouselRef = useRef();

	const styles = StyleSheet.create({
		pager: {
			height: height * 0.8,
			width,
		},
		page: {
			alignItems: "center",
		},
		circle: {
			position: "absolute",
			top: 575 * ratioY,
		},
		nav: {
			position: "absolute",
			top: (567 + 69) * ratioY,
			flexDirection: "column",
		},
		imageContainer: {
			marginTop: ((modelX - 326) / 2) * ratioX, //this statusBarHeight offset only works on Android
			borderRadius: borderRadius["border-radius-6"],
		},
		rightArrow: {
			height: 56,
			justifyContent: "center",
			alignItems: "center",
		},
		indicator: {
			marginTop: 52 * ratioY,
		},
	});

	const x1 = useSharedValue(52);
	const x2 = useSharedValue(86);

	const pages = [
		<FeaturesX key={0} Image={_Feature0} heading={copy.first.heading} body={copy.first.body} />,
		<FeaturesX key={1} Image={_Feature1} heading={copy.second.heading} body={copy.second.body} />,
		<FeaturesX key={2} Image={_Feature2} heading={copy.third.heading} body={copy.third.body} />,

	];

	return (
		<AppLayout>
			<Animated.View exiting={FadeOut.duration(250)} style={{ flex: 1 }}>
				<LinGradBackground>
					<Carousel x1={x1} x2={x2} ref={carouselRef} pages={pages} />
					<Svg style={styles.circle} height={519 * ratioY} width={516 * ratioX}>
						<Defs>
							<LinearGradient id="linGrad" x1="0" y1="0" x2="1" y2="0">
								<Stop offset="0" stopColor="#033C8D" stopOpacity="1" />
								<Stop offset="1" stopColor="#0E4A9F" stopOpacity="1" />
							</LinearGradient>
						</Defs>
						<Ellipse rx={516 * ratioX / 2} ry={519 * ratioY / 2} cx={516 * ratioX / 2} cy={519 * ratioY / 2} stroke="#2E76DA" fill="url(#linGrad)" />
					</Svg>
					<View style={styles.nav}>
						<Pressable
							onPress={() => {
								if (Math.round(x2.value) == 58) {
									navigation.navigate(isAuthenticated ? "WalletLanding" : "SignIn");
								}
								if (x1.value == 52) {
									carouselRef.current.scrollToIndex({ index: 1 });
								} else {
									carouselRef.current.scrollToIndex({ index: 2 });
								}
							}}
							style={styles.rightArrow}
						>
							<RightArrow />
						</Pressable>
						<View style={styles.indicator}>
							<Indicator x1={x1} x2={x2} />
						</View>
					</View>
				</LinGradBackground>
			</Animated.View>
		</AppLayout>
	);
};

export default Features;
