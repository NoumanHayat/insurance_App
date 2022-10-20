import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import Currency from "../misc/Currency";
import UserContext from "../../context/context";
import _BenefitsIcon from "../../../assets/icons/benefits.svg"

const BenefitsInfo = ({ benefits }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		page: {
			flex: 1,
			width: "100%",
			backgroundColor: "#FFFFFF",
			borderTopStartRadius: 6,
			borderTopEndRadius: 6,
			borderBottomStartRadius: 6,
			borderBottomEndRadius: 6,
			borderWidth: 1,
			alignItems: "center",
			paddingHorizontal: 24 * ratioX,
		},
		innerContainer: {
			flex: 1,
			width: "100%",
			marginBottom: 10 * ratioY,
		},
		cardHeader: {
			marginBottom: 20,
		},
		cardTitle: {
			fontWeight: "700",
			alignSelf: "center",
			marginBottom: 20 * ratioY,

		},
		lineBar: {
			height: 1,
			width: "100%",
			backgroundColor: "#D3D9DE",
		},
		scrollView: {
			width: "100%",
			marginTop: 20 * ratioY
		},
		iconContainer: {
			width: 44 * ratioY,
			height: 44 * ratioY,
			backgroundColor: "#0A678E",
			borderRadius: 22 * ratioY,
			marginBottom: 16 * ratioY,
			marginTop: 32 * ratioY,
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "center"
		},
		icon: {
			display: "flex",
			justifyContent: "center",
			alignSelf: "center",
			marginTop: 8 * ratioY,
		},
		sectionContainer: {
			marginBottom: 24 * ratioY,
		},
		sectionHeading: {
			fontWeight: platform == "android" ? "700" : "500",
			color: "#353B40",
			fontSize: Math.max(14, 14 * ratioY),
		},
		sectionValue: {
			fontSize: Math.max(14, 14 * ratioY),
			fontWeight: "700",
			color: "#196EE7",
			marginVertical: 6 * ratioY

		},
		sectionDescription: {
			fontSize: Math.max(12, 12 * ratioY),
			lineHeight: Math.max(14, 14 * ratioY),
			fontWeight: "400",
			color: "#6E7B87",
			marginBottom: 5 * ratioY
		},
		detailButtonsIcon: {
			height: 28 * ratioY,
			width: 28 * ratioY
		},
		detailButtonMargin: {
			marginLeft: 10 * ratioX
		},
		bulletPoint: {
			flexDirection: "row",
			alignItems: "center"
		},
		bullet: {
			height: 5 * ratioY,
			width: 5 * ratioY,
			borderRadius: 2.5 * ratioY,
			backgroundColor: "#000",
			marginHorizontal: 10 * ratioX
		},
		desc: {
			color: "#6E7B87",
			fontSize: Math.max(12, 12 * ratioY),
		}
	});

	return (
		<TouchableOpacity activeOpacity={1} style={styles.page}>
			<View style={styles.innerContainer}>
				<View style={styles.iconContainer}>
					<View style={styles.icon}>
						<_BenefitsIcon
							style={styles.detailButtonMargin}
							height={styles.detailButtonsIcon.height}
							width={styles.detailButtonsIcon.width}
						/>
					</View>
				</View>
				<Text style={styles.cardTitle}>Policy Add-ons</Text>
				<View style={styles.lineBar}></View>
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}>
					{benefits ? (
						<>
							{benefits.map((benefit) => {
								const heading = benefit.rate_code_description;
								const message = benefit.message;
								return benefit.tiers.map((tier, index) => {
									return (
										<TouchableWithoutFeedback key={index}>
											<View style={[styles.marginTop, styles.sectionContainer]}>
												<Text style={styles.sectionHeading}>{heading}</Text>
												<Currency
													styles={styles.sectionValue}
													value={tier.premium}
												/>
												<Text style={styles.sectionDescription}>{message}</Text>
												<View style={styles.bulletPoint}>
													<View style={styles.bullet} />
													<Text style={styles.desc}>{tier.desc[0]}</Text>
												</View>
												<View style={styles.bulletPoint}>
													<View style={styles.bullet} />
													<Text style={styles.desc}>{tier.desc[1]}</Text>
												</View>
												<View style={styles.bulletPoint}>
													<View style={styles.bullet} />
													<Text style={styles.desc}>{tier.desc[2]}</Text>
												</View>
											</View>
										</TouchableWithoutFeedback>
									)
								}

								);
							})}
						</>
					) : (
						// eslint-disable-next-line
						<Text>Benefits are either not ready or are unavailable. If you're unable to see your benefits after waiting, please sign in and try to view your benefits again.</Text>
					)}
				</ScrollView>
			</View>
		</TouchableOpacity>
	);
};

export default BenefitsInfo;
