import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";


/** This component renders a horizontal carousel for swiping between pages of content.
 * 	@param {AnimatedValue} offsetSV - This is the shared value which is equal to the `event.contentOffset.x`
 *  value returned by the scroll handler attached to the carousel.
 * 	@param {Object[]} pages - The pages of content to display in the carousel
 * 	@param {Number | String} width - The width of the carousel
 * 	@param {AnimatedValue} pageWidthSV - This is the shared value which is equal to width of the carousel
 */
const Carousel = ({ offsetSV, pages, width, pageWidthSV }) => {

	const ReanimatedFlatlist = Animated.createAnimatedComponent(FlatList);

	const styles = StyleSheet.create({
		flatList: {
			height: "100%",
			width: width ? width : "100%",
		},
	});

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			offsetSV.value = event.contentOffset.x;
		}
	});

	const handleOnLayout = (event) => {
		const { width: pageWidth } = event.nativeEvent.layout;
		pageWidthSV.value = pageWidth;
	}

	return (
		<View style={styles.flatList} onLayout={handleOnLayout}>
			<ReanimatedFlatlist
				showsHorizontalScrollIndicator={false}
				data={pages}
				initialScrollIndex={0}
				renderItem={({ item }) => item}
				horizontal
				pagingEnabled
				keyExtractor={(_, index) => index}
				onScroll={scrollHandler}
				onScrollToIndexFailed={() => { }}
			/>
		</View>
	);
}
;

export default Carousel;
