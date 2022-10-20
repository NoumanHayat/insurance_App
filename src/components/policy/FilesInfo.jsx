import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions
} from "react-native";
import CoverageIcon from "../../components/misc/CoverageIcon";
import DocumentIcon from "../../../assets/icons/document-icon.svg";
import DisabledDocIcon from "../../../assets/icons/disabledDoc-icon.svg";
import UserContext from "../../context/context";

const FilesInfo = ({ viewCertificate, viewCovernote, certificate, covernote }) => {
	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
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
		marginTop: {
			marginTop: 5,
		},
		scrollView: {
			width: "100%",
			marginTop: 20 * ratioY
		},
		iconContainer: {
			width: 44 * ratioY,
			height: 44 * ratioY,
			backgroundColor: "#C7A11A",
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
			color: "#353B40",
			fontSize: 10 * ratioY,
			marginBottom: 8 * ratioY,
		},
		documentContainer: {
			flexDirection: "row",
			alignItems: "center",
			padding: 12 * ratioY,
			borderTopStartRadius: 4,
			borderTopEndRadius: 4,
			borderBottomStartRadius: 4,
			borderBottomEndRadius: 4,
			borderWidth: 1,
			borderColor: "#D3D9DE",
		},
		documentText: {
			fontSize: 12 * ratioY,
			color: "#353B40",
			marginLeft: 12 * ratioX,
		},
		expiredText: {
			color: "#353B40",
		},
		expiredDocs: {
			backgroundColor: "#EDF0F2",
			justifyContent: "space-between"
		},
		expiredIconAndFilename: {
			flexDirection: "row",
			alignItems: "center"
		}
	});

	return (
		<TouchableOpacity activeOpacity={1} style={styles.page}>
			<View style={styles.innerContainer}>
				<View style={styles.iconContainer}>
					<View style={styles.icon}>
						<CoverageIcon
							source={require("../../../assets//icons/files-icon.png")}
						/>
					</View>
				</View>
				<Text style={styles.cardTitle}>My Files</Text>
				<View style={styles.lineBar} />
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}>
					<>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionHeading}>2018 Nissan Rogue</Text>
							<Pressable
								disabled={!certificate}
								onPress={viewCertificate}
								style={styles.documentContainer}>
								<DocumentIcon />
								<Text style={styles.documentText}>
									{certificate ? certificate : "Loading..."}
								</Text>
							</Pressable>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionHeading}>2017 BMW 320i</Text>
							<Pressable
								disabled={!certificate}
								onPress={viewCovernote}
								style={styles.documentContainer}>
								<DocumentIcon />
								<Text style={styles.documentText}>
									{covernote ? covernote : "Loading..."}
								</Text>
							</Pressable>
						</View>

						<View style={styles.sectionContainer}>
							<Text style={styles.sectionHeading}>2019 Toyota Vitz</Text>
							<View style={[styles.documentContainer, styles.expiredDocs]}>
								<View style={styles.expiredIconAndFilename}>
									<DisabledDocIcon />
									<Text style={[styles.documentText, styles.expiredText]}>
										Cover_note.pdf
									</Text>
								</View>
								<Text style={[styles.documentText, styles.expiredText]}>
									(Expired)
								</Text>
							</View>
						</View>
					</>
				</ScrollView>
			</View>
		</TouchableOpacity>

	);
};

export default FilesInfo;
