import React, { useContext } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Shadow } from "react-native-shadow-2";
import DatePicker from "react-native-datepicker";
import UserContext from "../../context/context";
import { borderRadius, colour, fontSize, fontWeight } from "../../styles/global";


const TimePicker = ({ pageColour, time, setTime, timePlaceholder}) => {
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
            width: "100%"
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
                        <Content time={time} setTime={setTime} />
                    </Shadow>
                </Shadow>
            ) : (
                <View style={[styles.shadow1]}>
                    <View style={styles.shadow2}>
                        <Content time={time} setTime={setTime} timePlaceholder={timePlaceholder}/>
                    </View>
                </View>
            )}
        </>

    );
}

export default TimePicker;

const Content = ({ time, timePlaceholder, setTime }) => {
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
			borderWidth: 1,
			borderColor: colour["colour-border-input-default"],
			backgroundColor: colour["colour-background-input"],
			borderRadius: borderRadius["border-radius-3"],
			justifyContent: "center",
		},
		placeholder: {
			fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
			fontSize: fontSize["font-size-3"] * ratioY,
			color: colour["colour-text-input-placeholder"],
			lineHeight: 18.75,
			position: "absolute",
			left: 11,

		},
		timePicker: {
			opacity: 0,
			width: 300,
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
			alignItems: "flex-start",
			position: "absolute",
			left: 11,
		},
		circle: {
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "37.5%",
			right: "5%",
			zIndex: 3,
			flex: 1,
			width: 12,
			height: 12,
		}
	});

	return (
		<View style={styles.container}>
			<View style={styles.input}>
				{time?.length > 0 ? (
					<View style={styles.enteredContainer}>
						<Text style={styles.entered}>{time}</Text>
					</View>
				) : (
					<Text style={styles.placeholder}>{timePlaceholder}</Text>
				)}

				{/* Add time picker component here */}
                <DatePicker
					style={styles.timePicker}
					time={time}
					mode="time"
					placeholder="Tap to select a time"
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					onDateChange={(time) => {
						setTime(time);
					}}
				/>

			</View>
			<View style={styles.circle}>
				<Svg height={12} width={12}>
					<Circle
						r={6}
						cx={6}
						cy={6}
						fill={time?.length > 0 ? "#68D391" : "#6E7B87"}
					/>
				</Svg>
			</View>
		</View>
	)
}