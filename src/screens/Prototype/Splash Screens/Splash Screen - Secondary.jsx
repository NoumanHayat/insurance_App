import React, { useContext } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../../../context/context";

import LinGradBackground from "../../../components/backgrounds/LinGradBackground";
import Logo from "../../../../assets/logo/logoWhiteLg.svg";
import LoadingBar from "../../../components/animations/LoadingBar";
import AppLayout from "../../../components/layouts/AppLayout";

const SplashSecondary = ({ to }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		loading: {
			marginTop: 19 * ratioY,
		},
	});

	return (
		<AppLayout>
			<LinGradBackground justify>
				<Logo height={171 * ratioY} width={257 * ratioX} />
				<View style={styles.loading}>
					<LoadingBar
						navigation={useNavigation()}
						to={to}
					/>
				</View>
			</LinGradBackground>
		</AppLayout>
	);
};

export default SplashSecondary;
