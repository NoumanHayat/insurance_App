import React, { useState, useEffect, useContext, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Modal,
	useWindowDimensions,
	FlatList
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { CustomToast } from "../../../components/toast";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Modal_ from "react-native-modal";
import { useSharedValue } from "react-native-reanimated";
import allSettled from "promise.allsettled"

import _CoverageIcon from "../../../../assets/icons/coverage.svg";
import _InfoBlueIcon from "../../../../assets/icons/Info-Icon-Blue.svg"
import _BenefitsIcon from "../../../../assets/icons/benefits.svg";
import _MyFilesIcon from "../../../../assets/icons/myFiles.svg";
import InfoOpenIcon from "../../../../assets/icons/Info-Open-Icon.svg";
import SwipeIcon from "../../../../assets/icons/swipe-icon.svg";
import PolicyDetailButton from "../../../components/buttons/PolicyDetail";
import Back from "../../../components/buttons/Back";
import WalletLayout from "../../../components/layouts/WalletLayout";
import PremiumBreakdown from "../../../components/policy/PremiumBreakdown";
import InsurancePeriod from "../../../components/policy/InsurancePeriod";
import UserContext from "../../../context/context";
import CoverageInfo from "../../../components/policy/CoverageInfo";
import BenefitsInfo from "../../../components/policy/BenefitsInfo";
import FilesInfo from "../../../components/policy/FilesInfoV2";
import { getAccess } from "../../../../store/v2/slices/session";
import Indicator from "../../../components/animations/Page Indicator/Second/Indicator";
import Carousel from "../../../components/carousels/Carousel";
import { getAdditionalBenefits } from "../../../../network/benefits";
import RiskSummary from "../../../components/policy/RiskSummary";
import { getRiskDetails } from "../../../lib/utils/extraction";
import TextButton2 from "../../../components/buttons/TextButton2"; // do not delete
import { getCertificateBase64File, getCoverNoteBase64File, fetchTertiaryToken } from "../../../lib/my files/getters";
import Dismiss from "../../../components/buttons/Dismiss";
import { doesStringContainPattern } from "../../../lib/my files/validation";
import { useHandleTopLevelAxiosError } from "../../../lib/utils/hooks/error handling";
import ContactModal from "../../../components/modals/renewals/ContactModal";
import PrelimQuestsModal from "../../../components/modals/renewals/PrelimQuestsModal";
import { getPolicyPaymentPlan } from "../../../../network/payments";
import { getPolicyPayment } from "../../../../network/policy";
import { getPolicies, getToastNotif } from "../../../../store/v2/slices/policies";
import BlankErrorModal from "../../../components/modals/errors/BlankErrorModal";
import ClaimTypeModal from "../../../components/modals/claims/ClaimTypeModal";
import ClaimQuestsModal from "../../../components/modals/claims/ClaimsQuestsModal";


const PolicyLanding = ({ params }) => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform, statusBarHeight, Quarter } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const accessToken = useSelector(getAccess);

	const navigation = useNavigation();
	const handleTopLevelAxiosError = useHandleTopLevelAxiosError();

	const [vehSumModalVisible, setVehSumModalVisible] = useState(false);
	const [sharedModalVisible, setSharedModalVisible] = useState(false);
	const [sharedModalPage, setSharedModalPage] = useState(0); // can be 0, 1 or 2
	const [benefits, setBenefits] = useState(undefined);
	const [certificates, setCertificates] = useState(undefined);
	const [coverNotes, setCoverNotes] = useState(undefined);
	// const [receipts, setReceipts] = useState(undefined);
	const [renewPolicy, setRenewPolicy] = useState(true);
	const [contactModalVisible, setContactModalVisible] = useState(false);
	const [prelimModalVisible, setPrelimModalVisible] = useState(false);
	const [contactAgic, setContactAgic] = useState(false);

	const [isPremium, setIsPremium] = useState();
	const [premiumData, setPremiumData] = useState([]);

	//Collision Claims
	const [incompleteModalVisible, setIncompleteModalVisible] = useState(false);
	const [claimTypeModal, setClaimTypeModal] = useState(false);
	const [claimQuestsModal, setClaimQuestsModal] = useState(false);
	const [incompleteClaim, setIncompleteClaim] = useState(true);


	const toast = useToast();



	const { breakdown, policy } = params ?? {};
	const { is_in_renewal, risks, policy_id, policy_prefix, policy_number } = policy ?? {};
	const riskIds = risks?.map(risk => risk.risk_id);
	const { total } = breakdown;
	const isPolicy = useSelector(getPolicies)
	// const toastNotif = useSelector(getToastNotif);
	const { toastNotif } = useSelector((state) => state.policies)
	console.log("policy_id:: ", policy_id);
	console.log("Toast it? ", toastNotif);

	const claimType = "collision";

	const x1 = useSharedValue(52);
	const x2 = useSharedValue(86);

	// useEffect(() => {
	// 	console.log("Toast me? ", toastNotif);
	// 	setTimeout(() => {
	// 				if (toastNotif) {
	// 		toast.show("Congrats! Your policy has been updated. You are offically covered. Have a great day!",
	// 		{ data: "Policy Updated", type: "success_type" },
	// 	);

	// 	}
	// 	}, 5000);


	// }, [toastNotif]);

	const vehicleIdentity = `${risks[0]?.year}  ${risks[0]?.make} ${risks[0]?.model}`

	const styles = StyleSheet.create({
		innerContainer: {
			flex: 1,
			paddingHorizontal: 24 * ratioX
		},
		titleContainer: {
			marginTop: 24 * ratioY,
			marginBottom: 20 * ratioY,
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center"
		},
		title: {
			fontSize: 16 * ratioY,
			color: "#B3BDC6",
			fontWeight: "500",
			lineHeight: 16 * ratioY,
			marginLeft: 12 * ratioX
		},
		cardHeaderGroup: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-end"
		},
		cardHeader: {
			color: "#FFFFFF",
			fontSize: vehicleIdentity?.length < 25 ? 24 * ratioY : 22 * ratioY,
			fontWeight: "600",
			lineHeight: 24 * ratioY,
		},
		removeIconContainer: {
			alignItems: "center",
			marginTop: 18 * ratioY
		},
		premiumBreakdownContainer: {
			marginTop: 16 * ratioY,
			marginBottom: 24 * ratioY,
		},
		insurancePeriodContainer: {
			marginBottom: 16 * ratioY,
		},
		detailButtons: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		modalView: {
			flex: 1,
			backgroundColor: "rgba(17, 24, 39, 0.7)",
			paddingHorizontal: 24 * ratioX,
			justifyContent: "flex-end",
			paddingBottom: 56 * ratioY,
		},
		summaryContainer: {
			width: "100%",
		},
		sharedModalView: {
			margin: 0,
			justifyContent: "flex-end",
			paddingTop: 77 * ratioY + statusBarHeight
		},
		sharedModalBackCard: {
			alignItems: "center",
			height: "100%",
			width: "100%",
			backgroundColor: "#374151",
			borderTopEndRadius: 24,
			borderTopStartRadius: 24,
		},
		sharedModalSwipeIcon: {
			marginTop: 12 * ratioY,
			alignItems: "center",
		},
		indicator: {
			alignItems: "center",
			justifyContent: "center",
			marginTop: 30 * ratioY,
		},
		detailButtonsIcon: {
			height: 28 * ratioY,
			width: 28 * ratioY
		},
		detailButtonMargin: {
			marginLeft: 10 * ratioX
		},
		detailPage: {
			height: "100%",
			width: width,
			alignItems: "center",
			paddingHorizontal: 24 * ratioX,
		},
		detailCardTitle: {
			color: "#FFFFFF",
			fontSize: 25 * ratioY,
			marginTop: 32 * ratioY,
			marginBottom: 10 * ratioY,
			alignSelf: "flex-start",
		},
		icon: {
			height: 32 * ratioY,
			width: 32 * ratioY
		},
		flexCenter: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 16 * ratioY,
			height: 42 * ratioY,
		},
		lastRowButtons: {
			width: "48%"
		},
	});

	// Pages for the 'COVERAGE/BENEFITS/MY FILES' carousel
	const pages = [
		<View key={0} style={styles.detailPage}>
			<Text style={styles.detailCardTitle}>Coverage</Text>
			<CoverageInfo limits={policy?.limits} />
		</View>,
		<View key={1} style={styles.detailPage}>
			<Text style={styles.detailCardTitle}>Benefits</Text>
			<BenefitsInfo benefits={benefits} />
		</View>,
		<View key={2} style={styles.detailPage}>
			<Text style={styles.detailCardTitle}>My Files</Text>
			<FilesInfo
				certificates={certificates}
				coverNotes={coverNotes}
				viewFile={viewFile}
			// receipts={receipts}
			/>
		</View>,
	];

	/** Fetch cover note, certificate and benefits */
	useEffect(() => {
		getDocumentWithRetries(fetchCertificates, 5000);
		getDocumentWithRetries(fetchCovernotes, 6000);
		// getBenefits(fetchReceipts, 7000);
		getDocumentWithRetries()
	}, [params])

	const getDocumentWithRetries = (fetchCallback, timeout) => {
		let retries = 0;
		try {
			fetchCallback();
		} catch (e) {
			console.error("Error: ", e);
			if (doesStringContainPattern(e.message, "Bad Key")) {
				if (retries <= 2) {
					setTimeout(() => {
						console.log("Attempting to get a new token for the certificate")
						fetchCallback();
						retries++
					}, timeout)
				} else {
					console.error("Still receiving invalid tokens after multiple requests.")
				}
			} else {
				console.error(e.message)
			}
		}
	}

	const getBenefits = async () => {
		try {
			/** From Stephan's code */
			/** We now have all risks for the vehicle but we must be careful too use the right benefits. For now ( q2 development ), only care about the first risk */
			console.log("Benefits Token: ", accessToken)
			let response = await getAdditionalBenefits({ token: accessToken, policy })
				.catch(err => {
					handleTopLevelAxiosError(err, getBenefits);
				});
			if (response?.benefits[0]?.benefits?.length > 0) {
				console.log("I have benefits :)")
				setBenefits(response.benefits[0].benefits)
			} else {
				console.log("I have no benefits :(")
			}
		} catch (e) {
			console.error("There was an error generated while attempting to fetch the benefits: ", e)
		}

	}

	const getDocuments = async (getBase64File, setState) => {
		const tertiaryToken = await fetchTertiaryToken("certificate");
		const documentPromises = []

		riskIds?.forEach(riskId => {
			const document = getBase64File(tertiaryToken, policy_id, riskId);
			documentPromises.push(document);
		})

		allSettled(documentPromises)
			.then(res => {
				const certificates = res?.map(settledPromise => {
					if (settledPromise?.status == "fulfilled" && settledPromise?.value !== undefined) {
						return settledPromise.value;
					}
				})
				setState(certificates)
			})
			.catch(console.error)
	}

	const fetchCovernotes = async () => {
		getDocuments(getCoverNoteBase64File, setCoverNotes)
	}

	const fetchCertificates = async () => {
		getDocuments(getCertificateBase64File, setCertificates)
	}

	// const fetchReceipts = async () => {
	// 	getDocuments(getReceiptsBase64File, setReceipts)
	// }

	const viewPDF = (uri) => {
		if (platform == "android") {
			// FileSystem.getContentUriAsync(uri).then((cUri) => {
			// 	IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
			// 		data: cUri,
			// 		flags: 1,
			// 	});
			// });
			navigation.navigate("ViewPDF", { cUri: uri })

		} else {
			navigation.navigate("ViewPDF", { cUri: uri })
		}
	};

	function viewFile(uri) {
		setSharedModalVisible(false);
		viewPDF(uri);
	}

	const MemoizedCarousel = useMemo(() => {
		return (
			<Carousel
				inModal
				x1={x1}
				x2={x2}
				pages={pages}
				initial={sharedModalPage}
			/>
		)
	}
		,
		[sharedModalPage, benefits, certificates, coverNotes] //receipts
	)

	// const renewPolicyCheck = () => renewPolicy ? "RenewPolicy" : "PayPremium"
	const getPaymentPlan = () => {
		console.log("Landing Policy: ", policy_id)
		getPolicyPayment(accessToken, policy_id)
			.then(res => {
				console.log("Landing:", res);
				setIsPremium(true);
			})
			.catch(err => {
				console.log("Error: ", err);
				setIsPremium(false)
			})
	}

	useEffect(() => {
		// getPaymentPlan();
		getPolicyPaymentPlan(policy_id)
			.then(res => {
				console.log("Landing:", res.data);
				setPremiumData(res.data?.policy_payment_plan?.payment_terms);
				const payment_plan = res?.data?.policy_payment_plan?.payment_terms;
				payment_plan?.map((plan) => {
					if (plan.transaction_id === "") {
						setIsPremium(true);
						return;
					} else {
						setIsPremium(false)
					}
				})
			})
			.catch(err => {
				console.log("Error: ", err);
				setIsPremium(false)
			})
	}, []);

	const customError = {
		title: "You have 1 incomplete or unsubmitted claim.",
		message: "Take a look at your recent claims to ensure you’re not about to file a claim that already exists.",
		blueBtnText: "File New Claim",
		greyBtnText: "View Recent Claims",
		blueBtnCallback: () => {
			setIncompleteModalVisible(false)
			setTimeout(() => {
				setClaimTypeModal(true)
			}, 1000
			);
		},
		greyBtnCallback: () => {
			setIncompleteModalVisible(!incompleteModalVisible)
			navigation.navigate("RecentClaims")
		}
	};

	const reportClaim = () => {
		if (incompleteClaim) {
			setIncompleteModalVisible(!incompleteModalVisible)
		} else {
			setClaimTypeModal(true)
		}
	}

	const onClaimTypePress = () => {
		console.log("Claim Type pressed! - 1")
		if (claimType === "collision") {
			setClaimTypeModal(false)
			setTimeout(() => {
				setClaimQuestsModal(!claimQuestsModal);
			}, 1000
			);
		}
	}

	const onBackPress = () => {
		setClaimQuestsModal(!claimQuestsModal);
		setTimeout(() => {
			setClaimTypeModal(true);
		}, 1000
		);
	}

	return (
		<WalletLayout statusBarColor="#111827" backgroundColor={"#353B40"}>
			<View style={styles.innerContainer}>
				<View style={styles.titleContainer}>
					<Pressable
						onPress={() => navigation.goBack()}>
						<Back />
					</Pressable>
					<Text style={styles.title}>My Wallet</Text>

				</View>
				<View style={styles.cardHeaderGroup}>
					<Text style={styles.cardHeader}>{vehicleIdentity}</Text>
					<Pressable
						style={styles.infoIcon}
						onPress={() => setVehSumModalVisible(true)}>
						<InfoOpenIcon style={styles.icon} />
					</Pressable>
				</View>

				<View style={styles.premiumBreakdownContainer}>
					<PremiumBreakdown
						breakdown={breakdown}
						nextPayment={20000}
						isInRenewal={false}
						paymentTerms={premiumData}
					/>
				</View>
				<View style={[styles.insurancePeriodContainer]}>
					<InsurancePeriod params={params} />
				</View>
				<View style={styles.detailButtons}>
					<Pressable
						onPress={() => {
							x1.value = 52;
							x2.value = 86;
							setSharedModalPage(0);
							setSharedModalVisible(true);
						}}>
						<PolicyDetailButton
							text="COVERAGE"
							backgroundColor="#2591BF"
							iconBackgroundColor="#0A678E"
						>
							<_CoverageIcon
								height={styles.detailButtonsIcon.height}
								width={styles.detailButtonsIcon.width}
							/>
						</PolicyDetailButton>
					</Pressable>
					<Pressable
						onPress={() => {
							x1.value = 24;
							x2.value = 86;
							setSharedModalPage(1);
							setSharedModalVisible(true);
						}}>
						<PolicyDetailButton
							text="BENEFITS"
							backgroundColor="#31976C"
							iconBackgroundColor="#186B48"
						>
							<_BenefitsIcon
								style={styles.detailButtonMargin}
								height={styles.detailButtonsIcon.height}
								width={styles.detailButtonsIcon.width}
							/>
						</PolicyDetailButton>
					</Pressable>
					<Pressable
						onPress={() => {
							x1.value = 24;
							x2.value = 58;
							setSharedModalPage(2);
							setSharedModalVisible(true);
						}}>
						<PolicyDetailButton
							text="MY FILES"
							backgroundColor="#C7A11A"
							iconBackgroundColor="#987807"
						>
							<_MyFilesIcon
								height={styles.detailButtonsIcon.height}
								width={styles.detailButtonsIcon.width}
							/>
						</PolicyDetailButton>
					</Pressable>
				</View>

				{
					Quarter >= 1 &&
					<View style={styles.flexCenter}>
						{
							contactAgic &&
							<Pressable
								disabled={!is_in_renewal}
								onPress={() => {
									console.log("Contact AGIC Clicked!")
									setContactModalVisible(true)
								}}
								style={styles.lastRowButtons}
							>
								<TextButton2
									text="Contact AGIC"
									textColor="#FFFFFF"
									backgroundColor="#2565BF"
									width="100%"
									height="100%"
									borderRadius={6}
									fontSize={16 * ratioY}
									disabled={!is_in_renewal}
								/>
							</Pressable>
						}
						{(!isPremium && !contactAgic) &&
							<Pressable
								disabled={!is_in_renewal}
								onPress={() => {
									setPrelimModalVisible(true)
								}}
								style={styles.lastRowButtons}
							>
								<TextButton2
									text="Renew Policy"
									textColor="#FFFFFF"
									backgroundColor="#2565BF"
									width="100%"
									height="100%"
									borderRadius={6}
									fontSize={16 * ratioY}
									disabled={!is_in_renewal}
								/>
							</Pressable>
						}
						{isPremium &&
							<Pressable
								// disabled={!is_in_renewal}
								onPress={() => {
									navigation.navigate("PayPremium", {
										policy,
										benefits,
										vehicleIdentity,
										premiumData,
										prevPremium: total,
									})
								}}
								style={styles.lastRowButtons}
							>
								<TextButton2
									text="Pay Premium"
									textColor="#FFFFFF"
									backgroundColor="#2565BF"
									width="100%"
									height="100%"
									borderRadius={6}
									fontSize={16 * ratioY}
								// disabled={!is_in_renewal}
								/>
							</Pressable>
						}

						{Quarter >= 3 &&
							<Pressable
								onPress={reportClaim}
								style={styles.lastRowButtons}>
								<TextButton2
									text="Report a Claim"
									textColor="#FFFFFF"
									backgroundColor="rgba(109, 40, 217, 1)"
									width="100%"
									height="100%"
									borderRadius={6}
									fontSize={16 * ratioY}
								/>
							</Pressable>
						}
					</View>
				}

				{/* Incomplete Claims Modal */}
				<BlankErrorModal
					visible={incompleteModalVisible}
					customError={customError}
					fontWeight="500"
				/>

				<ClaimTypeModal
					claimTypeModalVisible={claimTypeModal}
					setClaimTypeModalVisible={setClaimTypeModal}
					onClaimTypePress={onClaimTypePress}
					setClaimQuestsModal={setClaimQuestsModal}
				/>

				<ClaimQuestsModal
					claimQuestsModal={claimQuestsModal}
					setClaimQuestsModal={setClaimQuestsModal}
					onBackPress={onBackPress}
					vehicleIdentity={vehicleIdentity}
				/>

				<ContactModal
					contactModalVisible={contactModalVisible}
					setContactModalVisible={setContactModalVisible}
					policyPrefix={policy_prefix}
					policyNumber={policy_number}
					contactAgic={contactAgic}
					setContactAgic={setContactAgic}
				/>

				<PrelimQuestsModal
					prelimModalVisible={prelimModalVisible}
					setPrelimModalVisible={setPrelimModalVisible}
					setContactModalVisible={setContactModalVisible}
					policy={policy}
					benefits={benefits}
					vehicleIdentity={vehicleIdentity}
					prevPremium={total}
					renewPolicy={renewPolicy}
				/>

				{/* Risk/Vehicle Summary Modal a.k.a VehSumModal */}
				<Modal
					visible={vehSumModalVisible}
					animationType="slide"
					transparent={true}
					statusBarTranslucent={true}>
					<View style={styles.modalView}>
						<View style={styles.summaryContainer}>
							<FlatList
								data={policy?.risks}
								renderItem={({ item, index }) => {
									return (
										<RiskSummary key={index} params={{ ...getRiskDetails(item), policyNum: policy?.policy_number }} />
									)
								}}
								keyExtractor={(_, index) => index}
							/>
						</View>
						<View style={styles.removeIconContainer}>
							<Dismiss onPress={() => setVehSumModalVisible(false)} />
						</View>
					</View>
				</Modal>

				{/* Shared Modal */}
				<Modal_
					style={styles.sharedModalView}
					isVisible={sharedModalVisible}
					onBackdropPress={() => { setSharedModalVisible(false); }}
					onBackButtonPress={() => { setSharedModalVisible(false); }}
					animationInTiming={800}
					animationOutTiming={800}
					backdropTransitionInTiming={2000}
					backdropTransitionOutTiming={500}
					useNativeDriver={true}
					onSwipeComplete={() => { setSharedModalVisible(false); }}
					swipeDirection={["down"]}
					scrollOffset={1}
					scrollOffsetMax={400 - 300}
					propagateSwipe={true}
					hideModalContentWhileAnimating={true}
				>
					<Pressable
						onPress={() => setSharedModalVisible(!sharedModalVisible)}
					>
						<View style={styles.sharedModalBackCard}>
							<View style={styles.sharedModalSwipeIcon}>
								<SwipeIcon />
							</View>
							{MemoizedCarousel}
							<View style={styles.indicator}>
								<Indicator
									x1={x1}
									x2={x2}
									inModal
									line1FinalColour="#32AFE4"
									line2FinalColour="#50C192"
									line3FinalColour="#FFD53D"
								/>
							</View>
						</View>
					</Pressable>
				</Modal_>

			</View>

		</WalletLayout>
	);
};

export default PolicyLanding;
