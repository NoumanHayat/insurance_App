import React, { useContext } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colour, fontSize, fontWeight, borderRadius } from '../../../../../styles/global';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import TextButton2 from '../../../../../components/buttons/TextButton2';
import UserContext from '../../../../../context/context';

const WitnessDetails = () => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX; 
    
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 24,
            paddingTop: 16,
            flex: 1,
        },
        paragraph: {
            color: colour["colour-text-input-default"],
            fontWeight: fontWeight["font-weight-1"],
            lineHeight: 21,
            marginBottom: 32
        },
        boldText: {
            fontWeight: fontWeight["font-weight-3"],
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Be sure to have the <Text style={styles.boldText}>Name </Text> and  
                <Text style={styles.boldText}> Contact Info</Text> for each witness. 
            </Text>
            <Pressable>
                <TextButton2
                    text='Add Witness'
                    textColor='#fff'
                    backgroundColor='#047857'
                    width='100%'
                    height={42 * ratioY}
                    borderRadius={borderRadius["border-radius-4"]} 
                    fontSize={fontSize["font-size-3"] * ratioY}
                />
            </Pressable>
        </View>
    )
}

export default WitnessDetails

