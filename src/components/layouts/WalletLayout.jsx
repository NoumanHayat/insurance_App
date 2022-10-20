import React from "react";
import {
	View,
	StyleSheet,
	Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from "../misc/CustomStatusBar";

const WalletLayout = ({ children, backgroundColor, statusBarColor }) => {

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor,
		},
	});

	return (
		<View style={{ flex: 1 }}>
			<CustomStatusBar color={statusBarColor} />
			{Platform.OS == "ios" ? (
				<View style={styles.container}>
					{children}
				</View>
			) : (
				<SafeAreaView style={styles.container}>
					{children}
				</SafeAreaView>
			)}

		</View>
	);
};





export default WalletLayout;
