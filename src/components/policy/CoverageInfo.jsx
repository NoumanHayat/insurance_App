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

import CoverageIcon from "../../components/misc/CoverageIcon";
import Currency from "../misc/Currency";
import UserContext from "../../context/context";
import _CoverageIcon from "../../../assets/icons/coverage.svg"

const CoverageInfo = ({ limits }) => {
	const { height, width, scale, fontScale } = useWindowDimensions();
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
		},
		detailButtonsIcon: {
			height: 28 * ratioY,
			width: 28 * ratioY
		},
	});

	return (
		<TouchableOpacity activeOpacity={1} style={styles.page}>
			<View style={styles.innerContainer}>
				<View style={styles.iconContainer}>
					<View style={styles.icon}>
						<_CoverageIcon
							height={styles.detailButtonsIcon.height}
							width={styles.detailButtonsIcon.width}
						/>
					</View>
				</View>
				<Text style={styles.cardTitle}>Standard Full Coverage</Text>
				<View style={styles.lineBar} />
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.scrollView}>
					{limits &&
						limits.map((limit, index) => {
							return (
								<TouchableWithoutFeedback key={index}>
									<View
										style={styles.sectionContainer}>
										<Text style={styles.sectionHeading}>{limit.heading}</Text>
										<Currency
											styles={styles.sectionValue}
											value={limit.limit_amount}
										/>
										<Text style={styles.sectionDescription}>
											{limit.description}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							);
						})}
				</ScrollView>
			</View>
		</TouchableOpacity>
	);
};

export default CoverageInfo;
