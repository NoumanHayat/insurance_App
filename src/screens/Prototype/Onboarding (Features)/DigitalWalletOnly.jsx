import React, { useContext, useState, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
	Pressable,
	StatusBar
} from "react-native";
import { Svg, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

import { getAuthStatus } from "../../../../store/v2/slices/session";
import UserContext from "../../../context/context";
import LinGradBackground from "../../../components/backgrounds/LinGradBackground";
import {
	colour,
	fontSize,
	fontWeight,
	lineHeight,
	borderRadius,
} from "../../../styles/global";

import FeaturesX from "./FeaturesX";
import { copy } from "../../../copy/features";
import Feature0 from "../../../../assets/onboarding/onboarding-digital-wallet-updated.svg"
import RightArrow from "../../../components/buttons/RightArrow";
import AppLayout from "../../../components/layouts/AppLayout";

const DWOnly = ({ navigation }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const statusBarHeight = StatusBar.currentHeight;

	const styles = StyleSheet.create({

		page: {
			alignItems: "center",
		},
		circle: {
			position: "absolute",
			top: 625 * ratioY,
		},
		nav: {
			position: "absolute",
			top: 675 * ratioY,
			flexDirection: "column",
		},
		image: {
			marginTop: statusBarHeight + ((modelX - 326) / 2 * ratioX), //this statusBarHeight offset only works on Android

			height: 328 * ratioY,
			width: 346 * ratioX,
			borderRadius: borderRadius["border-radius-6"],
		},
		rightArrow: {
			height: 56,
			justifyContent: "center",
			alignItems: "center",
		},

	});

	return (
		<AppLayout>
			<LinGradBackground>
				<View style={styles.page}>
					<FeaturesX Image={Feature0} heading={copy.first.heading} body={copy.first.body} />
				</View>

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
							navigation.navigate("WalletLanding");
						}}
						style={styles.rightArrow}>
						<RightArrow />
					</Pressable>
				</View>
			</LinGradBackground>
		</AppLayout>
	);
};

export default DWOnly;
