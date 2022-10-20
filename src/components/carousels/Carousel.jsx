import React from "react";
import { StyleSheet, useWindowDimensions, FlatList, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

const Carousel = 
	({ x1, x2, pages, initial, inModal }) => {

		const { width } = useWindowDimensions();

		const ReanimatedFlatlist = Animated.createAnimatedComponent(FlatList);


		const styles = StyleSheet.create({
			flatList: {
				height: inModal ? "89%" : "100%"
			},
			separator: {
				width: "2%",
			},
			suspense: {
				position: "absolute",
				backgroundColor: "#4b5462",
				bottom: 0,
				height: "99%",
				width: "100%",
				zIndex: 2,
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25
			}
		});

		const scrollHandler = useAnimatedScrollHandler({
			onScroll: (event) => {
				const offset = event.contentOffset.x;

				const adjustment = 28 * (offset / width);

				if (width > offset > 0) {
					x1.value = Math.round(52 - adjustment);
				} else {
					x2.value = Math.round(86 - (adjustment - 28));
				}
			},
		});

		return (
				<View style={styles.flatList}>
					<ReanimatedFlatlist
						showsHorizontalScrollIndicator={false}
						data={pages}
						initialNumToRender={1}
						initialScrollIndex={initial}
						getItemLayout={(_, index) => ({ length: width, offset: width * index, index})}
						renderItem={({ item }) => item}
						horizontal
						pagingEnabled
						keyExtractor={(_, index) => index.toString()}
						onScroll={scrollHandler}
						onScrollToIndexFailed={() => { }}
					/>
				</View>
		);
	};

export default Carousel;
