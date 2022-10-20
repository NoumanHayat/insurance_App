import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";

import {
	fontSize,
	fontWeight,
} from "../../../styles/global";

import AccHolderDataPoint from "../General/AccHolderDataPoint";
import LogoSm from "../../../../assets/logo/AGIC Logo.svg";
import Spacer from "../General/Spacer";
import UserContext from "../../../context/context";
import { getName, getTrn } from "../../../../store/v2/slices/user";
import {
	getDateExp,
	getDateIss,
	getClass,
} from "../../../../store/v2/slices/license";

const AccountHolder = () => {

	const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

	const dateExp = useSelector(getDateExp);
	const dateIss = useSelector(getDateIss);
	const licenseClass = useSelector(getClass);
	const name = useSelector(getName);
	const trn = useSelector(getTrn);

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			backgroundColor: "#fff",
			borderRadius: 6,
			paddingVertical: 17 * ratioY,
			paddingHorizontal: 16 * ratioX,
            borderBottomWidth: 4 * ratioY,
            borderBottomColor: "#B3BDC6"
		},
		title: {
			fontWeight: fontWeight["font-weight-2"],
			fontSize: fontSize["font-size-0"] * ratioY,
			lineHeight: 11.72 * ratioY,
			color: "#2565BF",
		},
		logo: {
			position: "absolute",
			top: 16 * ratioY,
			right: 16 * ratioX,
			height: 52 * ratioY,
			width: 65 * ratioX
		},
		spacer: {
			marginVertical: 8 * ratioY,
		},
		spacerName: {
			marginTop: 8 * ratioY,
		},
        lower: {
            flexDirection: "row",
        },
        col1: {
            width: (145/410) * width
        }
	});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ACCOUNT HOLDER</Text>
			<LogoSm style={styles.logo} height={styles.logo.height} width={styles.logo.width}/>
			<View style={styles.spacerName}/>
			<AccHolderDataPoint property="Name" value={name} />
			<View style={styles.spacer}>
				<Spacer width="100%" />
			</View>
			<View style={styles.lower}>
				<View style={styles.col1}>
					<AccHolderDataPoint property="TRN" value={trn}/>
					<AccHolderDataPoint property="Driver's Licence Date Issued" value={dateIss}/>
				</View>
				<View style={styles.col2}>
					<AccHolderDataPoint property="Driver's Licence Class" value={licenseClass}/>
					<AccHolderDataPoint property="Driver's Licence Expiry Date" value={dateExp}/>
				</View>
			</View>
		</View>
	);
};

export default AccountHolder;
