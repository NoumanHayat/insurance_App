import React from "react";
import {
	View,
	StyleSheet,
	Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomStatusBar from "../misc/CustomStatusBar";

const AppLayout = ({ children }) => {

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#1F2937"
		},
		children: {
			flex: 1,
		},
	});

	return (
		<View style={styles.container}>
			<CustomStatusBar color="#111827" />
			{Platform.OS == "ios" ? (
				<View style={styles.children}>
					{children}
				</View>
			) : (
				<SafeAreaView style={styles.children}>
					{children}
				</SafeAreaView>
			)}

		</View>
	);
};





export default AppLayout;
