import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Pressable
} from "react-native";

import CoverageIcon from "../../../../assets/icons/coverage.svg"
import { useSharedValue } from "react-native-reanimated";

import Card from "../../card/_Card";
import UserContext from "../../../context/context";
import Size1 from "../../buttons/Size1";
import Carousel from "../../carousels/CarouselV3";
import Indicator from "../../animations/Page Indicator/Third/IndicatorV3";
import { getDescription } from "../../../lib/utils/extraction";

const BenefitInfoModal = ({ setModal, title, message, tiers }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const offsetSV = useSharedValue(0);
    const pageWidthSV = useSharedValue(0);

    const startColours = ["#9CA3AF"];
    const finishColours = ["#2591BF"];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            marginHorizontal: 24 * ratioX,
            justifyContent: "space-between",
            paddingBottom: 32 * ratioY
        },
        innerContainer: {
            height: "100%",
        },
        cardHeader: {
            marginBottom: 32 * ratioY,
        },
        iconContainer: {
            width: 44 * ratioY,
            height: 44 * ratioY,
            backgroundColor: "#0A678E",
            borderRadius: 22 * ratioY,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },
        icon: {
            marginTop: 8 * ratioY,
        },
        iconCustomSize: {
            height: 28 * ratioY,
            width: 28 * ratioY,
        },
        cardTitle: {
            color: "#2565BF",
            fontSize: 20,
            fontWeight: "600",
            alignSelf: "center",
            marginBottom: 16 * ratioY,
        },
        cardDescription: {
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24 * ratioY,
        },
        listContainer: {
            marginTop: 32 * ratioY,
        },
        dismiss: {
            width: "100%"
        },
        carousel: {
            marginTop: 32 * ratioY,
            height: "48%",
            borderRadius: 8 * ratioY,
            justifyContent: "center",
            overflow: "hidden"
        },
        indicatorContainer: {
            flex: 1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

        },
        indicator: {
            height: "100%",
            width: "50%",
            alignItems: "center",
            justifyContent: "center"
        },
    });

    const tierPages = tiers.map((tier, index) => {
        const title = `Tier ${index + 1} Coverage`;
        const desc = tier.desc;
        return <TierPage key={index} title={title} desc={desc} />
    })

    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.innerContainer}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <CoverageIcon
                                style={styles.icon}
                                height={styles.iconCustomSize.height}
                                width={styles.iconCustomSize.width}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDescription}>
                            {message}
                        </Text>
                    </View>
                    <View style={styles.carousel}>
                        <Carousel
                            pages={tierPages}
                            offsetSV={offsetSV}
                            pageWidthSV={pageWidthSV}
                        />
                    </View>
                    <View style={styles.indicatorContainer}>
                        <View style={styles.indicator}>
                            <Indicator
                                pageWidthSV={pageWidthSV}
                                numberOfSegments={tierPages.length}
                                gapPercentage={7}
                                offsetSV={offsetSV}
                                startColours={startColours}
                                finishColours={finishColours}
                            />
                        </View>
                    </View>
                </View>
            </Card>
            <Pressable style={styles.dismiss} onPress={() => setModal(false)}>
                <Size1 text="Dismiss" disabled={false} activeColor="#6B7280" />
            </Pressable>
        </View>
    );
}

const TierPage = ({ title, desc }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const pageWidth = width - (88 * ratioX) - 2

    const styles = StyleSheet.create({
        container: {
            width: pageWidth,
            height: "100%",
            backgroundColor: "#F3F4F6",
            paddingTop: 20 * ratioY,
            alignItems: "center",
            paddingHorizontal: 24 * ratioX
        },
        title: {
            color: "#1F2937",
            fontSize: 14 * ratioY,
            fontWeight: "600"
        },
        desc: {
            paddingTop: 20 * ratioY,
            borderTopWidth: 1,
            borderTopColor: "#D1D5DB",
            marginTop: 20 * ratioY,
            width: "100%"
        },
        descItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20 * ratioY
        }
    })

    const DescLineItem = ({ descString }) => {

        const { title, value } = getDescription(descString);

        const styles = StyleSheet.create({
            container: {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20 * ratioY
            },
            title: {
                fontSize: 14 * ratioY,
                fontWeight: "500",
                color: "#353B40",
                lineHeight: 14 * ratioY,
                width: "60%"
            },
            value: {
                fontSize: 12 * ratioY,
                fontWeight: "700",
                color: "#196EE7",
                lineHeight: 14 * ratioY
            }
        })

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {value && <Text style={styles.value}>{value}</Text>}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.desc}>
                {desc?.map((descString, index) => {
                    return (
                        <DescLineItem key={index} descString={descString} />
                    )
                })}
            </View>
        </View>
    )
}



export default BenefitInfoModal;
