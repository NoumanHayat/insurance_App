import React from "react";
import { Text, StyleSheet, View, useWindowDimensions } from "react-native";

import CardFrame from "../General/CardFrame";
import DataPoint from "../General/DataPoint";
// import PolicySignature from "../../../../assets/PolicySignature.svg";

const PolicyDetailed = ({ data }) => {

	const { height, width } = useWindowDimensions();

	const nameString = `${data.surname}, ${data.firstName} ${data.middleName}`;

	const { make } = data;
	const { coverNote, premium, horsepower } = data;
	const { dateSigned, datePayment, use } = data;

	const col1 = [{ property: "name", value: nameString }, make ];
	const col2 = [coverNote, premium, horsepower];
	const col3 = [dateSigned, datePayment, use];

	const styles = StyleSheet.create({
		upper: {
			flexDirection: "row",
			justifyContent: "space-between",
			paddingRight: (56/375) * width
			// height: 150
		},
		lower: {
			height: 56,
			marginTop: 4
		},
		mystery: {
			height: 28,
			// width: 94,
			backgroundColor: "#D3D9DE",
		},
		col1: {
			width: (94/375) * width,
		},
		policySignature: {

		},
	});

	return (
		<CardFrame>
			<View style={styles.upper}>
				<View style={styles.col1}>
					<View style={styles.mystery} />
					<View>
						{col1.map((item) => (
							<DataPoint
								key={item.property}
								property={item.property}
								value={item.value}
							/>
						))}
					</View>
				</View>
				<View>
					{col2.map((item) => (
						<DataPoint
							key={item.property}
							property={item.property}
							value={item.value}
						/>
					))}
				</View>
				<View>
					{col3.map((item) => (
						<DataPoint
							key={item.property}
							property={item.property}
							value={item.value}
						/>
					))}
				</View>
			</View>
			<View style={styles.lower}>
				{/* <PolicySignature style={styles.policySignature} /> */}
			</View>
		</CardFrame>
	);
};



export default PolicyDetailed;
