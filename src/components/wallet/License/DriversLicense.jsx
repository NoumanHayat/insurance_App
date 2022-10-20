import React from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
} from "react-native";

import CardFrame from "../General/CardFrame";
import DataPoint from "../General/DataPoint";
// import Photo from "../../../../assets/LicensePhoto.svg";
// import Signature from "../../../../assets/LicenseSignature.svg";

const DriversLicense = ({ data }) => {
	const { height, width } = useWindowDimensions();

	const nameString = `${data.surname}, ${data.firstName} ${data.middleName}`;

	const { _class, dateIss, dateExp } = data;
	const { trn, collectorate, dateBirth } = data;
	const { sex } = data;

	const col1 = [_class, dateIss, dateExp];
	const col2 = [trn, collectorate, dateBirth];

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-end",
		},
		leftSection: {
			width: (160 / 375) * width,
		},
		rightSection: {
			alignItems: "center",
		},
		mystery: {
			height: (28 / 812) * height,
			width: (160 / 375) * width,
			backgroundColor: "#D3D9DE",
		},
		upperData: {
			width: (160 / 375) * width,
			flexDirection: "row",
			alignItems: "flex-end",
			justifyContent: "space-between",
		},
		lowerData: {
			width: (160 / 375) * width,
		},
		photo: {
			height: 97,
			width: 67,
		},
		signatureText: {
			fontSize: 6,
			lineHeight: 10,
		},
		signature: {
			height: 35,
			width: 78,
		},
	});

	return (
		<CardFrame>
			<View style={styles.container}>
				<View style={styles.leftSection}>
					<View style={styles.mystery} />
					<View style={styles.upperData}>
						<View>
							{col1.map((item) => (
								<DataPoint
									key={item.value}
									property={item.property}
									value={item.value}
								/>
							))}
						</View>
						<View>
							{col2.map((item) => (
								<DataPoint
									key={item.value}
									property={item.property}
									value={item.value}
								/>
							))}
						</View>
						<DataPoint property={sex.property} value={sex.value} />
					</View>
					<View style={styles.lowerData}>
						<DataPoint property="name" value={nameString} />
						<DataPoint
							property={data.address.property}
							value={data.address.value}
						/>
					</View>
				</View>
				<View style={styles.rightSection}>
					<Photo style={styles.photo} />
					<Text style={styles.signatureText}>SIGNATURE OF LICENSE</Text>
					<Signature style={styles.signature} />
				</View>
			</View>
		</CardFrame>
	);
};

export default DriversLicense;
