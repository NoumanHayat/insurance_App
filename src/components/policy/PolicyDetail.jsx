import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";


import RightArrow from "../../../assets/icons/right-arrow.svg";
import NewsIcon from "../../../assets/icons/news-icon.svg";
import ProfileIcon from "../../../assets/icons/profile-icon.svg";
import EventIcon from "../../../assets/icons/event-icon.svg";
import DollarIcon from "../../../assets/icons/dollar-icon.svg";
import Currency from "../misc/Currency";

import { getDateTime } from "../../lib/utils/formatters";
import { getVehicleSummary } from "../../lib/utils/extraction";
import { calculateBreakdown } from "../../../helpers/breakdown";
import { fontWeight } from "../../styles/global";
import UserContext from "../../context/context";
import { canRenew } from "../../../helpers/policy";

const getPeriodOfInsurance = (endDate) => {
	const period_ms = (new Date(endDate) - new Date()) / 86400000; // # of ms in a day
	return Math.floor(period_ms);
};

const PolicyDetail = ({ navigation, policy, index }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			// width: 362,
			width: "100%",
			backgroundColor: "#B3BDC6",
			borderRadius: 6,
		},
		innerContainer: {
			width: "100%",
			marginBottom: 3 * ratioY,
			backgroundColor: "#FFFFFF",
			borderRadius: 6,
			paddingTop: "4%",
			paddingLeft: "4%",
			paddingRight: "2%",
			paddingBottom: "4%",
		},
		cardHeader: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
			paddingBottom: 13 * ratioY,
			// height: "13%",
		},
		cardDetails: {
			// height: "87%",
		},
		flexDirection: {
			display: "flex",
			flexDirection: "row",
		},
		coverNoteDetailsContainer1: {
			marginBottom: 10 * ratioY,
		},
		coverNoteDetailsContainer2: {},
		vehicleType: {
			color: "#2565BF",
			fontSize: 10 * ratioY,
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
		},
		vehicleTypeLabel: {
			marginBottom: 3 * ratioY,
		},
		vehicleDetails: {
			color: "#222426",
			fontSize: 14 * ratioY,
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
		},
		infoTitle: {
			color: "#4B5563",
			fontSize: 10 * ratioY,
			fontWeight: "400",
			lineHeight: 10 * ratioY,
			marginBottom: 5 * ratioY,
		},
		info: {
			color: "#1F2937",
			fontSize: 16 * ratioY,
			fontWeight: "400",
			lineHeight: 16 * ratioY,
			marginBottom: 3 * ratioY,
		},
		calendar: {
			color: "#525B64",
		},
		iconContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#EDF0F2",
			borderRadius: 6,
			minWidth: 32 * ratioY,
			height: 32 * ratioY,
			marginRight: 8 * ratioX,
		},
		policyNumberContainer: {
			marginLeft: 10 * ratioX,
		},
	});

	const getPolicyAndCoverNoteNum = (policy, coverNote) => {
			return (
				<View style={[styles.coverNoteDetailsContainer2, styles.flexDirection]}>
					<View style={styles.coverNoteContainer}>
						<Text style={styles.infoTitle}>Cover Note</Text>
						<Text style={styles.info}>{coverNote?.covet_note_id}</Text>
					</View>
					<View style={styles.policyNumberContainer}>
						<Text style={styles.infoTitle}>Policy Number</Text>
						<Text style={styles.info}>
							{policy?.policy_prefix}-{policy?.policy_number}
						</Text>
					</View>
				</View>
			);
	};

	const breakdown = calculateBreakdown(policy);

	return (
		<View key={index} style={styles.container}>
			<View style={styles.innerContainer}>
				<View style={styles.cardHeader}>
					<View style={styles.vehicleTypeContainer}>
						<View style={styles.vehicleTypeLabel}>
							<Text style={styles.vehicleType}>YEAR MAKE MODEL</Text>
						</View>
						<View style={styles.vehicleTypeDetails}>
							<Text style={styles.vehicleDetails}>
								{policy.risks[0].year} {policy.risks[0].make} {policy.risks[0].model}
							</Text>
						</View>
					</View>
					<View>
						<Pressable
							style={styles.iconContainer}
							onPress={() =>
								navigation.navigate("Policy", {
									policyNum: policy.policy_prefix + "-" + policy.policy_number,
									period: getPeriodOfInsurance(policy.end_date),
									start: getDateTime(policy.start_date),
									end: getDateTime(policy.end_date),
									breakdown: canRenew(policy)
										? breakdown
										: {
											...breakdown,
											total: policy.annual_premium,
										},
									policy,
									...getVehicleSummary(policy),
								})
							}
						>
							<RightArrow />
						</Pressable>
					</View>
				</View>
				<View style={styles.cardDetails}>
					<View style={[styles.coverNoteDetailsContainer1, styles.flexDirection]}>
						<View style={styles.iconContainer}>
							<NewsIcon />
						</View>
						{getPolicyAndCoverNoteNum(policy, policy?.other_risk_details[0]?.cover_notes[0])}
					</View>
					<View style={[styles.coverNoteDetailsContainer1, styles.flexDirection]}>
						<View style={styles.iconContainer}>
							<ProfileIcon />
						</View>
						<View style={styles.coverNoteDetailsContainer2}>
							{policy.insured.map((insured, index) => {
								return (
									<View key={index} style={styles.coverNoteContainer}>
										<Text style={styles.infoTitle}>Insured</Text>
										<Text style={styles.info}>
											{insured.global_name.first_name}{" "}
											{insured.global_name.last_name}
										</Text>
									</View>
								);
							})}
						</View>
					</View>
					<View style={[styles.coverNoteDetailsContainer1, styles.flexDirection]}>
						<View style={styles.iconContainer}>
							<EventIcon />
						</View>

						<View style={styles.coverNoteDetailsContainer2}>
							<View style={styles.coverNoteContainer}>
								<Text style={styles.infoTitle}>Period Of Insurance</Text>
								<Text style={[styles.info]}>
									{getPeriodOfInsurance(policy.end_date)} Days
								</Text>
							</View>
							<View style={styles.coverNoteContainer}>
								<Text style={styles.infoTitle}>Expires At</Text>
								<Text style={[styles.info]}>{getDateTime(policy.end_date)}</Text>
							</View>
							<View style={styles.coverNoteContainer}>
								<Text style={styles.infoTitle}>Effective From</Text>
								<Text style={[styles.info]}>{getDateTime(policy.start_date)}</Text>
							</View>
						</View>
					</View>
					<View style={[styles.coverNoteDetailsContainer1, styles.flexDirection]}>
						<View style={styles.iconContainer}>
							<DollarIcon />
						</View>
						<View style={styles.coverNoteDetailsContainer2}>
							<View style={styles.coverNoteContainer}>
								<Text style={styles.infoTitle}>Premium</Text>
								<Text style={styles.info}>
									<Currency value={ canRenew(policy) ? breakdown?.total : policy?.annual_premium } />
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default PolicyDetail;
