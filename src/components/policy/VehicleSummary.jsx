import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import NewsIcon from "../../../assets/icons/news-icon.svg";
import CarIcon from "../../../assets/icons/car-icon.svg";
import HashIcon from "../../../assets/icons/hash-icon.svg";
import WeightIcon from "../../../assets/icons/weight-icon.svg";
import RoadIcon from "../../../assets/icons/road-icon.svg";
import Currency from "../misc/Currency";

const VehicleSummary = ({ params }) => {
	const {
		endorsement,
		colour,
		bodyType,
		ccRating,
		seating,
		registration,
		chassis,
		use,
		engineNo,
		policyNum,
		breakdown
	} = params;

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
			backgroundColor: "#B3BDC6",
			borderRadius: 6,
		},
		innerContainer: {
			width: "100%",
			height: "99%",
			backgroundColor: "#FFFFFF",
			borderRadius: 6,
			marginBottom: "1%",
		},
		grayBackground: {
			backgroundColor: "#EDF0F2",
		},
		vehicleDetails: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingTop: 8,
			paddingBottom: 8,
		},
		cardHeaderContainer: {
			paddingTop: 16,
			paddingRight: 16,
			paddingBottom: 4,
			paddingLeft: 16,
			marginBottom: 6,
		},
		cardHeader: {
			color: "#2565BF",
			fontSize: 10,
			fontWeight: "500",
			lineHeight: 12,
		},
		marginLeft: {
			marginLeft: 16,
		},
		marginRight: {
			marginRight: 16,
		},
		grayText: {
			color: "#8D9AA5",
			lineHeight: 14,
		},
		blackText: {
			color: "#222426",
		},
		vehicleDetailsContainer: {
			marginBottom: "5%",
		},
		sectionDetailsContainer: {
			flexDirection: "row",
			width: "100%",
			marginTop: 5,
		},
		sectionDetails: {
			width: "80%",
		},
		iconContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#EDF0F2",
			borderRadius: 6,
			minWidth: 32,
			height: 32,
			marginTop: 5,
		},
		line: {
			width: "90%",
			height: 1,
			backgroundColor: "#D1D5DB",
			alignSelf: "center",
		}
	});

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.innerContainer}
				showsVerticalScrollIndicator={false}>
				<View style={styles.cardHeaderContainer}>
					<Text style={styles.cardHeader}>VEHICLE SUMMARY</Text>
				</View>
				<View style={styles.line}/>
				<View style={styles.vehicleDetailsContainer}>
					<View style={styles.sectionDetailsContainer}>
						<View style={[styles.iconContainer, styles.marginLeft]}>
							<NewsIcon />
						</View>
						<View style={styles.sectionDetails}>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Policy Number
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{policyNum}
								</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Endorsement
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{endorsement}
								</Text>
							</View><View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Estimated Value
								</Text>
								<Currency value={breakdown.market_value} styles={[styles.marginRight, styles.blackText]} />
							</View>
						</View>
					</View>
					{/* line here */}
					<View style={styles.line}></View>
					<View style={styles.sectionDetailsContainer}>
						<View style={[styles.iconContainer, styles.marginLeft]}>
							<CarIcon />
						</View>
						<View style={styles.sectionDetails}>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>Colour</Text>
								<Text style={[styles.marginRight, styles.blackText]}>{colour}</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>Body Type</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{bodyType}
								</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>C.C./H.P.</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{ccRating}
								</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Seating Capacity
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{seating}
								</Text>
							</View>
						</View>
					</View>
					{/* line here */}
					<View style={styles.line}></View>
					<View style={styles.sectionDetailsContainer}>
						<View style={[styles.iconContainer, styles.marginLeft]}>
							<HashIcon />
						</View>
						<View style={styles.sectionDetails}>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Registration Mark
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{registration}
								</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>Chasis No.</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{chassis}
								</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>Engine No.</Text>
								<Text style={[styles.marginRight, styles.blackText]}>
									{engineNo}
								</Text>
							</View>
						</View>
					</View>
					{/* line here */}
					<View style={styles.line}></View>
					<View style={styles.sectionDetailsContainer}>
						<View style={[styles.iconContainer, styles.marginLeft]}>
							<WeightIcon />
						</View>
						<View style={styles.sectionDetails}>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Laden Weight
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>1640kg</Text>
							</View>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>
									Unladen Weight
								</Text>
								<Text style={[styles.marginRight, styles.blackText]}>1100kg</Text>
							</View>
						</View>
					</View>
					{/* line here */}
					<View style={styles.line}></View>
					<View style={styles.sectionDetailsContainer}>
						<View style={[styles.iconContainer, styles.marginLeft]}>
							<RoadIcon />
						</View>
						<View style={styles.sectionDetails}>
							<View style={styles.vehicleDetails}>
								<Text style={[styles.marginLeft, styles.grayText]}>Use</Text>
								<Text style={[styles.marginRight, styles.blackText]}>{use}</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default VehicleSummary;
