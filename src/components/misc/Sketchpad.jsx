import React, { useState, useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable, Text} from 'react-native';

import UserContext from '../../context/context';
import DynamicTotal from '../renewals/DynamicTotal/DynamicTotal';

const SketchPad = () => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, } = useContext(UserContext);
    const ratioX = width / modelX;
    // eslint-disable-next-line
    const ratioY = height / modelY;

    const [value, setValue] = useState(100);

    const increment = () => {
        setValue(value => value + 100)
    }

    const decrement = () => {
        setValue(value => value - 100)
    }


    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#1F2937",
            flex: 1,
            paddingHorizontal: 24 * ratioX,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            padding: 15,
            borderColor: "#fff",
            borderWidth: 1,
            marginTop: 10
        }
    })

    return (
        <View style={styles.page}>
            <View style={{ paddingTop: 50 }}/>
                <DynamicTotal value={value}/>
                <Pressable style={styles.button} onPress={increment}>
                    <Text style={{ color: "#fff" }}>Increment</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={decrement}>
                    <Text style={{ color: "#fff" }}>Decrement</Text>
                </Pressable>
        </View>
    )
}

export default SketchPad;