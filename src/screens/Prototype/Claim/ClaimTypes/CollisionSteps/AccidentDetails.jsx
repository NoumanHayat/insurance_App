import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Text,
} from "react-native";
import UserContext from '../../../../../context/context';
import CustomDate from '../../../../../components/inputs/CustomDate';
import TimePicker from '../../../../../components/inputs/TimePicker';
import InputTextV3 from '../../../../../components/inputs/InputTextV3';
import ScrollViewWithFade from '../../../../../components/scrollviews/ScrollViewWithFade';


const AccidentDetails = () => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const [accidentDate, setAccidentDate] = useState(new Date(Date.now()));
    const [accidentTime, setAccidentTime] = useState(new Date("01/01/1997"));
    const [accidentLocation, setAccidentLocation] = useState();
    const [accidentDescription, setAccidentDescription] = useState();
    const [locationValid, setLocationValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);


    const styles = StyleSheet.create({
        formContainer: {
            flex: 1,
            flexDirection: "column",
            padding: 24,
            backgroundColor: "#1F2937",
            width: "100%",
            marginBottom: 120
        },
        inputGroup: {
            marginBottom: 30 * ratioY,
        },
        locationInput: {
            height: 96,
        },
        formLabel: {
            color: "#8D9AA5",
            marginBottom: 8 * ratioY,
            fontSize: 10 * ratioY,
            fontWeight: "600"
        },
        formLabelLocation: {
            marginBottom: 30 * ratioY,
        },
        formLabelDescription: {
            marginBottom: 145 * ratioY,
        }
    });


    return (
        <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.formLabel}> Date of Incident </Text>
                    <CustomDate
                        date={accidentDate}
                        setDate={setAccidentDate}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.formLabel}> Time of Incident </Text>
                    <TimePicker
                        time={accidentTime}
                        setTime={setAccidentTime}
                        timePlaceholder="Tap to select a time"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.formLabel, styles.formLabelLocation]}> Location of Incident </Text>
                    <InputTextV3
                        inputHeight={96}
                        placeholder="Include street names and landmarks"
                        keyboardType="default"
                        setExtracted={setAccidentLocation}
                        valid={locationValid}
                        setValid={setLocationValid}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.formLabel, styles.formLabelDescription]}> Description of Incident </Text>
                    <InputTextV3
                        inputHeight={320}
                        placeholder="Be as detailed as possible: include direction of travel for vehicles, weather conditions, etc"
                        keyboardType="default"
                        setExtracted={setAccidentDescription}
                        valid={descriptionValid}
                        setValid={setDescriptionValid}
                    />
                </View>
            </View>
        </ScrollViewWithFade>
    );
}

export default AccidentDetails;