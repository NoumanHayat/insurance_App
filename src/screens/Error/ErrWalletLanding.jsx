import React from "react";
import {
	Text,
	Image,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import WalletLayout from "../../components/layouts/WalletLayout";

import Null from "../../../assets/error/doNotDisturb.svg";
import LargeButton from "../../components/buttons/LargeButton";

const ErrWalletLanding = () => {
	const { height } = useWindowDimensions();

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
		},
		myWallet: {
			fontSize: 18,
			lineHeight: 22,
            fontWeight: "600",
			marginTop: (18 / 812) * height,
			alignSelf: "flex-start",
		},
		image: {
			marginTop: (241 / 812) * height,
			height: 52,
			width: 52,
		},
		errLine1: {
			marginTop: (24 / 812) * height,
			fontSize: 20,
			lineHeight: 24,
			color: "#6E7B87",
		},
		errLine2: {
			marginTop: 0,
			fontSize: 16,
			lineHeight: 24,
			color: "#6E7B87",
		},
		refresh: {
			marginTop: (36 / 812) * height,
		},
	});

	return (
		<WalletLayout>
			<View style={styles.container}>
				<Text style={styles.myWallet}>My Wallet</Text>
				<Image source={Null} style={styles.image} />
				<Text style={styles.errLine1}>We were unable to load your files</Text>
				<Text style={styles.errLine2}>Try refreshing the page</Text>
				<View style={styles.refresh}>
					<LargeButton
						background="#353B40"
						paddingVertical={16}
						paddingHorizontal={12}
						borderRadius={8}
						text="Refresh Page"
					/>
				</View>
			</View>
		</WalletLayout>
	);
};

export default ErrWalletLanding;
