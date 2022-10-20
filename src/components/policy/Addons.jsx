import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  useCollapsible,
  AnimatedSection,
} from "reanimated-collapsible-helpers";

export default function Addons() {
  const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();

  return (
    <View style={styles.background}>
      {/* <View style={styles.overflow}> */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.premiumDetailsContainer}>
          <Text style={styles.buttonText}>Windshield Coverage</Text>
        </View>
        {/* </TouchableOpacity> */}
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
          height={height}
        >
          <View style={styles.textContainer}>
            <View style={styles.extendedPremiumDetails}>
              <Text>Market Value:</Text>
              <Text>$4,564,000.00</Text>
            </View>
            <View style={styles.extendedPremiumDetails}>
              <Text>Total Risk Premium:</Text>
              <Text>$4,564,000.00</Text>
            </View>
            <View style={styles.extendedPremiumDetails}>
              <Text>Discounts Applied:</Text>
              <Text>$4,564,000.00</Text>
            </View>
            <View style={styles.extendedPremiumDetails}>
              <Text>Renewal Premium:</Text>
              <Text>$4,564,000.00</Text>
            </View>
            <View style={styles.extendedPremiumDetails}>
              <Text>GCT:</Text>
              <Text>$4,564,000.00</Text>
            </View>
          </View>
        </AnimatedSection>
        {/* <View style={styles.textCenter}>
          <Text>View More</Text>
        </View> */}
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    borderColor: "blue",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#6E7B87",
    borderWidth: 1,
    borderRadius: 4,
    // padding: 20,
  },
  //   overflow: {
  //     overflow: "hidden",
  //     backgroundColor: "white",
  //     borderRadius: 6,
  //   },
  button: {
    // padding: 10,
    textAlign: "center",
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
  },
  textContainer: {
    padding: 15,
  },
  textCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8F8",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    // borderColor: "red",
    // borderWidth: 1,
  },
  textFontSize: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  premiumDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    // borderColor: "green",
    // borderWidth: 1,
  },
  extendedPremiumDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
