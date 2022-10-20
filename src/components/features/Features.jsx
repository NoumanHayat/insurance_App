import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// import SliderActivated from "../../../assets/icons/slider-activated";
// import SliderDeactivated from "../../../assets/icons/slider-deactivated";
// import Data from "../../sample-data/sample-data.json";

const Features = () => {

    const styles = StyleSheet.create({
        container: {

        },
        content: {

        },
        slider: {
            borderWidth: 1,
            
        },
    });

    const [currentContent, setCurrentContent] = useState(0);
    const [barSelected, setBarSelected] = useState(0);

    const handleClick = (index) => {
        setBarSelected(index);
        setCurrentContent(index);
    };

    return (
        <View style={StyleSheet.container}>
            <View>
                <View style={StyleSheet.content}>
                    <Text>
                        {Data.contents[currentContent]?.content}
                    </Text>
                </View>
                <View style={StyleSheet.slider}>
                    {Data.contents.map((value, bar) => (
                        <Pressable onPress={() => handleClick(bar)}>
                            {barSelected === bar ? <SliderActivated /> : <SliderDeactivated />}
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default Features;
