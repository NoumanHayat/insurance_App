import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Slot = ({ index, pageNumber, prev, left, send }) => {



	// const machine = createMachine({
	// 	initial: pageNumber == index ? "grown" : "shrunk",
	// 	states: {
	// 		shrunk: {
	// 			on: {
	// 				ANIMATE: {
	// 					target: "grown",
	// 					cond: () => pageNumber == index,
	// 					actions: () => {
	// 						console.log(index + " is growing");
	// 					},
	// 				},
	// 			},
	// 		},
	// 		grown: {
	// 			on: {
	// 				ANIMATE: {
	// 					target: "shrunk",
	// 					cond: () => pageNumber != index,
	// 					actions: () => {
	// 						console.log(index + " is shrinking");
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	useEffect(() => { send("ANIMATE") })

	// const service = interpret(machine);

	// // useEffect(() => {
	// 	service.start();
	// 	service.send("ANIMATE");
	// 	service.stop();;
	// // });

	const styles = StyleSheet.create({
		slot: {
			position: "absolute",
			left,
			height: 2,
			width: 24,
			backgroundColor: "#FFD43B",
		},
	});

	return <Animated.View style={[styles.slot]} />;
};

export default Slot;
