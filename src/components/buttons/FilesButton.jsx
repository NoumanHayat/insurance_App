import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Shadow } from "react-native-shadow-2";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { fontWeight } from "../../styles/global";

import CoverageIcon from "../misc/CoverageIcon";
import SwipeIcon from "../../../assets/icons/swipe-icon.svg";
import FilesInfo from "../policy/FilesInfo";
import { DOC_MAN_SERVICE } from "@env";
import UserContext from "../../context/context";

const FilesButton = ({
	text,
	textColor,
	backgroundColor,
	width,
	height,
	borderRadius,
	fontSize,
	source,
	iconBackgroundColor,
	openModal,
	limits,
}) => {
	const navigation = useNavigation();

	const { platform } = useContext(UserContext);

	const viewPDF = (uri) => {
		if (platform == "android") {
			FileSystem.getContentUriAsync(uri).then((cUri) => {
				IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
					data: cUri,
					flags: 1,
				});
			});
		} else {
			FileSystem.getContentUriAsync(uri).then((cUri) => {
				navigation.navigate("ViewPDF", {
					cUri,
				});
			});
		}
	};

	useEffect(() => {
		FileSystem.downloadAsync(
			`${DOC_MAN_SERVICE}/api/documents/622a55c91eb080047ed27515`,
			FileSystem.cacheDirectory + "certificate.pdf"
		)
			.then(({ uri, headers }) => {
				const [, filenameRaw] = headers["Content-Disposition"].split(";");
				const regex = new RegExp(/[^"\\]*.pdf/, "g");
				const [filename] = regex.exec(filenameRaw);
				setCertificateURI(uri);
				setCertificate(filename);
			})
			.catch(console.error);

		FileSystem.downloadAsync(
			`${DOC_MAN_SERVICE}/api/documents/622a55c91eb080047ed27515`,
			FileSystem.cacheDirectory + "policy.pdf"
		)
			.then(({ uri, headers }) => {
				const [, filenameRaw] = headers["Content-Disposition"].split(";");
				const regex = new RegExp(/[^"\\]*.pdf/, "g");
				const [filename] = regex.exec(filenameRaw);
				setPolicyURI(uri);
				setPolicy(filename);
			})
			.catch(console.error);
	}, []);

	const styles = StyleSheet.create({
		text: {
            color: textColor,
            fontSize: fontSize,
            // fontFamily: "Roboto",
    		fontWeight: platform === "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
        },
        buttonContainer: {
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
        },
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        iconContainer: {
            width: 44,
            height: 44,
            backgroundColor: iconBackgroundColor,
            borderRadius: 36,
            marginBottom: 3,
        },
        icon: {
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
			marginTop: 5,
        },
        modalView: {
            margin: 0,
            justifyContent: "flex-end",
        },
        backCard: {
            justifyContent: "flex-end",
            alignItems: "center",
            height: "90%",
            width: "100%",
            paddingTop: "3%",
            backgroundColor: "#374151",
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
        },
        innerCard: {
            height: "90%", //formerly 557
            width: "90%",
        },
        cardTitle: {
            color: "#FFFFFF",
            fontSize: 25,
        },
        cardTitleContainer: {
            width: "90%",
            alignSelf: "flex-start",
            marginLeft: "4.5%",
            marginTop: 32,
            marginBottom: 10,
        },
        swipeIconContainer: {
            alignItems: "center"
        },
        gestureRecog: {
            flex: 1,
            width: "100%",
        },
	});

	const [certificate, setCertificate] = useState(undefined);
	const [policy, setPolicy] = useState(undefined);
	const [certificateURI, setCertificateURI] = useState(undefined);
	const [policyURI, setPolicyURI] = useState(undefined);
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View>
			<Shadow startColor="rgba(0,0,0,0.12)" radius={15} offset={[0, 5]}>
				<View
					style={[styles.buttonContainer, styles.center]}>
					<View style={[styles.iconContainer, styles.center]}>
						<View style={styles.icon}>
							<CoverageIcon source={source} />
						</View>
					</View>
					<Text style={styles.text}>{text}</Text>
				</View>
			</Shadow>
		</View>
	);
};

export default FilesButton;
