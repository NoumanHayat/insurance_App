import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
	TouchableWithoutFeedback
} from "react-native";
import { CustomToast } from "../../../components/toast";
import { useSelector } from "react-redux";
import Animated, { SlideInUp, FadeIn } from "react-native-reanimated";

import { fontWeight } from "../../../styles/global";
import Ellipse13 from "../../../../assets/wallet/ellipse-13.svg"
import Ellipse14 from "../../../../assets/wallet/ellipse-14.svg"
import UserContext from "../../../context/context";
import WalletLayout from "../../../components/layouts/WalletLayout";
import PolicyDetail from "../../../components/policy/PolicyDetail";
import AccountHolder from "../../../components/wallet/License/AccountHolder";
import { getPolicies } from "../../../../store/v2/slices/policies";
import CustomErrorBoundary from "../../../components/error handling/CustomErrorBoundary";
import { useEffect } from "react";

const WalletLanding = ({ navigation }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const policies = useSelector(getPolicies);

	const styles = StyleSheet.create({
		heading: {
			fontSize: 24 * ratioY,
			lineHeight: 24 * ratioY,
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			color: "#FFFFFF",
		},
		subHeading: {
			fontSize: 12,
			lineHeight: 14.52,
			fontWeight:
				platform == "android"
					? fontWeight["font-weight-4"]
					: fontWeight["font-weight-3"],
			marginTop: (25 / 812) * height,
		},
		license: {
			marginTop: 28 * ratioY,
		},
		policiesHeading: {
			marginTop: 38 * ratioY,
		},
		policies: {
			marginTop: 16 * ratioY,
		},
		policy: {
			marginBottom: 16 * ratioY,
		},
		ellipsesContainer: {
			position: "absolute",
			left: -110 * ratioX,
			top: -124 * ratioY,
		},
		ellipses: {
			height: 392 * ratioY,
			width: 580 * ratioX
		},
		innerContainer: {
			marginTop: 26 * ratioY,
			display: "flex",
			marginHorizontal: 24 * ratioX,
		},
		spacer: {
			height: 50,
		},
	});


	return (
		<WalletLayout statusBarColor={"#111827"} backgroundColor={"#0D489A"}>
			{/* Ellipse group */}
	
			<Animated.View entering={SlideInUp.duration(500).delay(500)} style={styles.ellipsesContainer}>
				<View style={{ position: "absolute" }}>
					<Ellipse13 height={300} width={580} />
				</View>
				<Ellipse14 height={300} width={580} />
			</Animated.View>

			<ScrollView>

				<View style={styles.innerContainer}>

					<Text style={styles.heading}>My Wallet</Text>
					<Animated.View
						entering={SlideInUp.duration(500).delay(1000)}
						style={styles.license}>
						<CustomErrorBoundary>
							<AccountHolder />
						</CustomErrorBoundary>
					</Animated.View>
					<Animated.View
						entering={FadeIn.duration(500).delay(1500)}
						style={styles.policies}>
						<View>
								{policies?.map((policy, index) => {
									return (
										<TouchableWithoutFeedback key={index}>
											<View style={styles.policy}>
												<CustomErrorBoundary>
													<PolicyDetail policy={policy} index={index} navigation={navigation} />
												</CustomErrorBoundary>
											</View>
										</TouchableWithoutFeedback>
									)
								})}
						</View>
					</Animated.View>
				</View>

			</ScrollView>
			<View style={styles.spacer} />
		</WalletLayout>
	);
};

export default WalletLanding;
