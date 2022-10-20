import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import WalletActive from "../../../../assets/wallet/wallet-active.svg";
import WalletInactive from "../../../../assets/wallet/wallet-inactive.svg";
import ProfileActive from "../../../../assets/wallet/profile-active.svg";
import ProfileInactive from "../../../../assets/wallet/profile-inactive.svg";
import WalletLanding from "./WalletLanding";
import Profile from "./Profile"
import UserContext from "../../../context/context";


const MyWallet = () => {

	const Tab = createBottomTabNavigator();
	const insets = useSafeAreaInsets();
	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;


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
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							if (focused) {
								return <WalletActive />;
							} else {
								return <WalletInactive />;
							}
						},
					}}
					name="Wallet"
					component={WalletLanding}
				/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return <ProfileActive />;
						} else {
							return <ProfileInactive />;
						}
					},
				}}
				name="Profile"
				component={Profile}
			/>
		</Tab.Navigator>
	);
};

export default MyWallet;
