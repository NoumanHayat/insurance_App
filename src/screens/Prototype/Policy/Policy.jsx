import React, { useContext } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import WalletActive from "../../../../assets/wallet/wallet-active.svg";
import WalletInactive from "../../../../assets/wallet/wallet-inactive.svg";
import ProfileActive from "../../../../assets/wallet/profile-active.svg";
import ProfileInactive from "../../../../assets/wallet/profile-inactive.svg";
import ErrWalletLanding from "../../Error/ErrWalletLanding";
import PolicyLanding from "./PolicyLanding";
import Profile from "../Wallet/Profile"
import UserContext from "../../../context/context";

const Policy = ({ route }) => {
    const Tab = createBottomTabNavigator();
	const insets = useSafeAreaInsets();
	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;
	const error = false;

	let tabBarStyle =
	{
		backgroundColor: "#111827",
		height: 90 * ratioY,
		paddingHorizontal: 105 * ratioX,
		borderTopWidth: 1,
		borderTopColor: "#4B5563",
	}

	let tabBarIconStyle = {
		justifyContent: "center",
		marginTop: insets.bottom ? insets.bottom/2 : 0
	}

    return (
        <Tab.Navigator
			screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: tabBarStyle, tabBarHideOnKeyboard: true, tabBarIconStyle: tabBarIconStyle }}>
			{error ? (
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							if (focused) {
								return <WalletActive style={styles.icon} />;
							} else {
								return <WalletInactive style={styles.icon} />;
							}
						},
					}}
					name="ErrWalletLanding"
					component={ErrWalletLanding}
				/>
			) : (
				<Tab.Screen
					// style={{ borderWidth: 1, borderColor: "red" }}
					options={{
						tabBarIcon: ({ focused }) => {
							if (focused) {
								return <WalletActive style={styles.icon} />;
							} else {
								return <WalletInactive style={styles.icon} />;
							}
						},
					}}
					name="Wallet"
				>
					{() => <PolicyLanding params={route.params} />}
					</Tab.Screen>
			)}

			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return <ProfileActive style={styles.icon} />;
						} else {
							return <ProfileInactive style={styles.icon} />;
						}
					},
				}}
				name="Profile"
				component={Profile}
			/>
		</Tab.Navigator>
    );
}

const styles = StyleSheet.create({
	icon: {
		// height: 24,
		// width: 21,
	},
});

export default Policy;
