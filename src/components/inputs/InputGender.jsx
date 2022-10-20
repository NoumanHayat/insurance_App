import React, { useContext } from "react";
import {
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Shadow } from "react-native-shadow-2";
import RNPickerSelect from 'react-native-picker-select';

import {
	borderRadius,
	colour,
	fontSize,
	fontWeight,
} from "../../styles/global";

import UserContext from "../../context/context";


const InputGender = ({ inputWidth, pageColour, gender, setGender }) => {

	const { platform } = useContext(UserContext);

	const styles = StyleSheet.create({
		shadow1: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 10,
			},
			shadowRadius: 15,
			shadowOpacity: 0.12,
		},
		shadow2: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowRadius: 6,
			shadowOpacity: 0.07,
		},
	});

	return (
		<>
			{platform == "android" ? (
				<Shadow
					startColor="rgba(0,0,0,0.12)"
					finalColor={pageColour}
					radius={15}
					offset={[0, 10]}
					viewStyle={{ flex: 1, width: "100%" }}
				>
					<Shadow
						startColor="rgba(0,0,0,0.07)"
						finalColor={pageColour}
						radius={6}
						offset={[0, 4]}
						viewStyle={{ flex: 1, width: "100%" }}
					>
						<Contents inputWidth={inputWidth} gender={gender} setGender={setGender} />

					</Shadow>
				</Shadow>
			) : (
				<View style={[styles.shadow1]}>
					<View style={[styles.container, styles.shadow2]}>
						<Contents inputWidth={inputWidth} gender={gender} setGender={setGender} />
					</View>
				</View>
			)}
		</>
	);
};

const Contents = ({ gender, setGender }) => {

	const { height } = useWindowDimensions();
	const { modelY, platform } = useContext(UserContext);
	const ratioY = height / modelY;

	const styles = StyleSheet.create({
		container: {
			height: 48 * ratioY,
			justifyContent: "center",
		},
		input: {
			position: "absolute",
			height: "100%",
			width: "100%",
			borderColor: colour["colour-border-input-default"],
			backgroundColor: colour["colour-background-input"],
			borderRadius: borderRadius["border-radius-3"],
			justifyContent: "center",
			borderWidth: 1
		},
		placeholder: {
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			color: colour["colour-text-input-placeholder"],
			lineHeight: 18.75,
			position: "absolute",
			left: 11,
		},
		entered: {
			fontWeight: fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			lineHeight: 18,
			backgroundColor: "#525B64",
			color: "#fff",
			padding: 4,
			borderRadius: borderRadius["border-radius-2"],
		},
		enteredContainer: {
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			left: 11,
		},
		picker: {
			opacity: 0,
		},
		circle: {
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "37.5%", // 18px / 48px
			right: "5%", // 18px / 342px
			zIndex: 3,
			flex: 1,
			width: 12,
			height: 12,
		}
	});

	return (
		<View style={styles.container}>
			<View
				style={styles.input}
			>
				{gender?.length > 0 ? (
					<View style={styles.enteredContainer}>
						<Text style={styles.entered}>{gender}</Text>
					</View>
				) : (
					<Text style={styles.placeholder}>Gender</Text>
				)}
				<View style={styles.picker}>
					<RNPickerSelect
						style={styles.picker}
						placeholder={{
							label: 'Gender',
							value: null,
							color: "#2565BF",
						}}
						onValueChange={(itemValue) => {
							if (itemValue !== null) {
								setGender(itemValue)
							} else {
								setGender("")
							}
						}}
						items={[
							{ label: 'Male', value: 'Male' },
							{ label: 'Female', value: 'Female' },
						]}
					/>
				</View>

			</View>
			<View style={styles.circle}>
				<Svg height={12} width={12}>
					<Circle
						r={6}
						cx={6}
						cy={6}
						fill={gender?.length > 0 ? "#68D391" : "#6E7B87"}
					/>
				</Svg>
			</View>
		</View>
	)
}

export default InputGender;
