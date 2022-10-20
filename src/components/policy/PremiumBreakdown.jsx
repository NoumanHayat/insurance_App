import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, useWindowDimensions, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from "react-native-reanimated";

import Currency from "../misc/Currency";
import UserContext from "../../context/context";
import InfoIcon from "../../../assets/icons/Info-Icon-Blue.svg"
import ScheduleCard from "../renewals/PaymentPlan/PaymentPlanCard";
import PaymentPlanInfoModal from "../modals/renewals/PaymentPlanInfoModalV2";
import PaymentPlanScheduleModal from "../modals/renewals/PaymentPlanScheduleModal";

const PremiumBreakdown = ({ breakdown, nextPayment, isInRenewal, paymentTerms }) => {

	const { height, width } = useWindowDimensions();
	const [modal, setModal] = useState(false);
	const { modelY, modelX, platform } = useContext(UserContext);
	const ratioY = height / modelY;
	const ratioX = width / modelX;

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			padding: 16,
			backgroundColor: "#fff",
			borderRadius: 6,
		},
		cardTitle: {
			fontSize: 16 * ratioY,
			fontWeight: "500",
			marginBottom: 16 * ratioY,
		},
		cardDetails: {
			justifyContent: "space-between",
			width: "100%",
			paddingTop: 16 * ratioY,
			paddingHorizontal: 16 * ratioY,
			borderRightWidth: 1,
			borderTopWidth: 1,
			borderLeftWidth: 1,
			borderTopStartRadius: 4,
			borderTopRightRadius: 4,
			borderColor: "#D3D9DE",
		},
		extendedPremiumDetails: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 16 * ratioY,
		},
		detailsText: {
			fontSize: 12 * ratioY,
			lineHeight: 12 * ratioY,
			color: "#525B64",
		},
		detailsPrice: {
			color: "#222426",
			fontWeight: "500",
			fontSize: 12 * ratioY
		},
		totalContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: 16 * ratioX,
			paddingVertical: 18 * ratioY,
			borderWidth: 1,
			borderColor: "#D3D9DE",
			borderBottomStartRadius: 4,
			borderBottomEndRadius: 4,
		},
		total: {
			fontSize: 14 * ratioY,
			fontWeight: "700",
			color: "#4B5563",
			lineHeight: 14 * ratioY
		},
		premiumTotalAndInfoGroup: {
			flexDirection: "row",
			alignItems: "center",
		},
		premiumTotalValue: {
			fontWeight: "600",
			fontSize: 16 * ratioY,
			color: "#2565BF",
			marginRight: 8 * ratioX,
		},
		infoIcon: {
			height: 16 * ratioY,
			width: 16 * ratioY
		},
		oldTextAndValues: {
			position: "absolute",
		},
		totalTextContainer: {
			width: "40%"
		},
		totalText: {
			fontSize: 14 * ratioY,
			lineHeight: 14 * ratioY,
			fontWeight: platform == 'ios' ? "600" : "700",
			color: "#4B5563",
		},
		totalValueContainer: { 
			width: "40%",
			alignItems: "flex-end" 
		}
	});

	const newPremiumTotalOpacitySV = useSharedValue(0);
	const oldPremiumTotalOpacitySV = useSharedValue(1);
	const nextPaymentOpacitySV = useSharedValue(0);

	const newPremiumTotalStyles = useAnimatedStyle(() => ({
		opacity: newPremiumTotalOpacitySV.value,
		height: interpolate(newPremiumTotalOpacitySV.value, [0, 1], [0, 16 * ratioY]),
		marginBottom: interpolate(newPremiumTotalOpacitySV.value, [0, 1], [0, 16 * ratioY])
	}));

	const oldPremiumTotalTextStyles = useAnimatedStyle(() => ({
		opacity: oldPremiumTotalOpacitySV.value,
		transform: [{ translateY: interpolate(oldPremiumTotalOpacitySV.value, [1, 0], [0, -14 * ratioY]) }],
	}))

	const oldPremiumTotalValueStyles = useAnimatedStyle(() => ({
		opacity: oldPremiumTotalOpacitySV.value,
		transform: [{ translateY: interpolate(oldPremiumTotalOpacitySV.value, [1, 0], [0, -16 * ratioY]) }],
	}));

	const nextPaymentTextStyles = useAnimatedStyle(() => ({
		opacity: nextPaymentOpacitySV.value,
		transform: [{ translateY: interpolate(nextPaymentOpacitySV.value, [0, 1], [12, 0]) }]
	}))

	const nextPaymentValueStyles = useAnimatedStyle(() => ({
		opacity: newPremiumTotalOpacitySV.value,
		transform: [{ translateY: interpolate(oldPremiumTotalOpacitySV.value, [1, 0], [16 * ratioY, 0]) }],
	}));

	const showPremiumTotal = () => {
		newPremiumTotalOpacitySV.value = withTiming(1, { duration: 2000 })
	};

	const hideOldPremiumTotal = () => {
		oldPremiumTotalOpacitySV.value = withTiming(0, { duration: 2000 })
	}

	const showNextPayment = () => {
		nextPaymentOpacitySV.value = withTiming(1, { duration: 2000 })
	};

	useEffect(() => {
		if (isInRenewal) {
			showPremiumTotal();
			showNextPayment();
			hideOldPremiumTotal();
		}
	}, [isInRenewal])

	return (
		<View style={styles.container}>
			<Text style={styles.cardTitle}>Premium Breakdown</Text>
			<View style={styles.cardDetails}>
				<View style={styles.extendedPremiumDetails}>
					<Text style={styles.detailsText}>Market Value</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.market_value} />
				</View>
				<View style={styles.extendedPremiumDetails}>
					<Text style={styles.detailsText}>Total Risk Premium</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.total_premium} />
				</View>
				<View style={styles.extendedPremiumDetails}>
					<Text style={styles.detailsText}>Discount Applied</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.total_discounts} />
				</View>
				<View style={styles.extendedPremiumDetails}>
					<Text style={styles.detailsText}>Renewal Premium</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.renewal_premium} />
				</View>
				<View style={styles.extendedPremiumDetails}>
					<Text style={styles.detailsText}>GCT</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.GCT} />
				</View>
				<Animated.View style={[styles.extendedPremiumDetails, newPremiumTotalStyles]}>
					<Text style={styles.totalText}>Premium Total</Text>
					<Currency styles={styles.detailsPrice} value={breakdown.total} />
				</Animated.View>
			</View>

			<View style={styles.totalContainer}>
				<View style={styles.totalTextContainer}>
					<Animated.Text
						style={[
							oldPremiumTotalTextStyles, 
							styles.oldTextAndValues, 
							styles.totalText
						]}
						>
						Premium Total
					</Animated.Text>
					<Animated.Text style={[styles.detailsText, nextPaymentTextStyles, styles.totalText]}>Next Payment</Animated.Text>
				</View>
				<View style={styles.totalValueContainer}>
					<Animated.View
						style={[styles.premiumTotalAndInfoGroup, oldPremiumTotalValueStyles, styles.oldTextAndValues]}>
						<Currency styles={styles.premiumTotalValue} value={breakdown.total} />
						<Pressable onPress={() => setModal(true)}>
							<InfoIcon style={styles.infoIcon} />
						</Pressable>
						
					</Animated.View>
					<Animated.View style={[styles.premiumTotalAndInfoGroup, nextPaymentValueStyles]}>
						<Currency styles={styles.premiumTotalValue} value={nextPayment} />
						<Pressable onPress={() => setModal(true)}>
							<InfoIcon style={styles.infoIcon}/>
						</Pressable>
						
					</Animated.View>
				</View>
			</View>

			<PaymentPlanScheduleModal
                paymentTerms={paymentTerms}
                visible={modal}
                setVisible={setModal}
                scheduledAmount={nextPayment}
                scheduledDate={"12/01/2022"}
            />
		</View>
	);
};

export default PremiumBreakdown;
