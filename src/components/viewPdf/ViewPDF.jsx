import React, { useContext } from "react";
import { useWindowDimensions, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PDFReader from "rn-pdf-reader-js";

import UserContext from "../../context/context";
import Back from "../buttons/Backv2";

const ViewPDF = ({ route }) => {

	const navigation = useNavigation()

	const { height, width } = useWindowDimensions();
	const { modelX, modelY, statusBarHeight } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const { cUri } = route.params;

	const styles = StyleSheet.create({
		page: {
			height: "100%",
			width: "100%",
		},
		back: {
			position: "absolute",
			zIndex: 2,
			top: (24 + statusBarHeight) * ratioY,
			left: 24 * ratioX
		}
	});

	return (
		<View style={{ flex: 1 }}>
			<Pressable style={styles.back} onPress={() => navigation.goBack()}>
				<Back />
			</Pressable>
			<PDFReader
				source={{ base64: cUri }}
				customStyle={{
					readerContainer: styles.page,
					readerContainerDocument: styles.page,
				}}
			/>
		</View>
	);
};

export default ViewPDF;
