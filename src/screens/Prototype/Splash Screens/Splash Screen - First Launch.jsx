import React, { useContext } from "react";
import {
	View,
	StyleSheet,
	Image,
	useWindowDimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import Animated, {
	Keyframe,
	Easing,
	SlideInDown,
	SlideInUp,
} from "react-native-reanimated";

import UserContext from "../../../context/context";

import LinGradBackground from "../../../components/backgrounds/LinGradBackground";
import fLImage from "../../../../assets/onboarding/firstLaunch.png";
import Logo from "../../../../assets/logo/logoWhiteLg.svg";
import TextButton1 from "../../../components/buttons/TextButton1";
import AppLayout from "../../../components/layouts/AppLayout";

import {
	colour,
	fontSize,
} from "../../../styles/global";

const FirstLaunch = ({ navigation }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const animDuration = 700;
	const animDelay = 200;


	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
		},
		imageContainer: {
			position: "absolute"
		},
		image: {
			height: 415 * ratioY,
			width: 312 * ratioX,
		},
		logo: {
			marginTop: 253 * ratioY, // starting position
			width: 257 * ratioX,
			height: 171 * ratioY,
		},
		iosLogo: {
			marginTop: 238 * ratioY,
		},
		button: {
			marginTop: 300 * ratioY,
		},
	});

	const logoKeyframe = new Keyframe({
		0: {
			transform: [{ translateY: 0 }],
		},
		100: {
			transform: [{ translateY: 185 * ratioY }],
			easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
		},
	});

	return (
		<AppLayout>
			<LinGradBackground>
				<View style={styles.container}>

					<Animated.View
						entering={SlideInUp.easing(Easing.bezier(0.3, -0.05, 0.7, -0.5))
							.duration(animDuration)
							.delay(animDelay)}
						style={styles.imageContainer}>
						<Shadow 
							startColor="rgba(0,0,0,0.08)"
							radius={15}
							offset={[0, -7]} >
							<Image style={styles.image} source={fLImage} />
						</Shadow>
					</Animated.View>

					<Animated.View
						entering={logoKeyframe.duration(animDuration).delay(animDelay)}>
						<Logo height={styles.logo.height} width={styles.logo.width}
							style={styles.logo}
						/>
					</Animated.View>

					<Animated.View
						style={styles.button}
						entering={SlideInDown.easing(Easing.bezier(0.3, -0.05, 0.7, -0.5))
							.duration(animDuration)
							.delay(animDelay)}>
						<TextButton1
							text="Sign in"
							textColor={colour["colour-text-button-1"]}
							backgroundColor={colour["color-number-input-default"]}
							width={312 * ratioX}
							height={48 * ratioY}
							borderRadius={4}
							fontSize={fontSize["font-size-5"]}
							navigation={navigation}
							to="Features"
						/>
					</Animated.View>
				</View>
			</LinGradBackground>
		</AppLayout>
	);
};

export default FirstLaunch;
