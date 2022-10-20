import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import InputText from '../../../../../../components/inputs/InputTextV2';
import UserContext from "../../../../../../context/context";
import InputWithCustomPicker from '../../../../../../components/inputs/InputWithCustomPicker';
import CountryPicker from '../../../../../../components/inputs/Custom Pickers/CountryPicker';
import ParishOrStatePicker from '../../../../../../components/inputs/Custom Pickers/ParishOrStatePicker';
import DoubleTextInput from '../../../../../../components/inputs/DoubleInputText';
import { isAlphanumeric, isAlphanumericWithBlankspace } from '../../../../../../lib/utils/input validation/general';

const BillingAddress = ({ setBillingAddress, setIsBillingAddressValid }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    // eslint-disable-next-line
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [country, setCountry] = useState();
    const [parish, setParish] = useState();
    const [city, setCity] = useState();
    const [zipCode, setZipCode] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();

    const [isAddressLine1Valid, setIsAddressLine1Valid] = useState(false);
    const [isAddressLine2Valid, setIsAddressLine2Valid] = useState(undefined);
    const [isCityValid, setIsCityValid] = useState(false);
    const [isZipCodeValid, setIsZipCodeValid] = useState(undefined);
    const [isCountryValid, setIsCountryValid] = useState(false);
    const [isParishValid, setIsParishValid] = useState(false);

    const billingAddressValids = [isCountryValid, isParishValid, isCityValid, isParishValid, isAddressLine1Valid, isAddressLine2Valid, isZipCodeValid];

    const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        title: {
            color: "#fff",
            fontSize: 18 * ratioY,
            marginBottom: 32 * ratioY
        },
        inputGroup: {
            marginBottom: 20 * ratioY,
            alignItems: "flex-start",
        },
        inputTitle: {
            color: "#8D9AA5",
            marginBottom: 4 * ratioY,
            fontSize: 10 * ratioY,
        },
        doubleInputGroup: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        subGroupLeft: {
            width: "52%"
        },
        subGroupRight: {
            width: "40%",
        }
    })

    /** Setting validity of country & parish */
    useEffect(() => {
        setIsCountryValid(!country ? false : true);
        setIsParishValid(!parish ? false : true);
    }, [country, parish])

    useEffect(() => {
        const result = areAllValid(billingAddressValids);
        if (result) {
            setIsBillingAddressValid(true);
            setBillingAddress({ country, parish, addressLine1, addressLine2, city, zipCode })
        } 
        // else {
        //     setIsBillingAddressValid(false);
        //     setBillingAddress(undefined)
        // }
    }, [isCountryValid, isCityValid, isAddressLine1Valid, isAddressLine2Valid, isZipCodeValid, isParishValid])

    const areAllValid = (valids) => {
        return valids.every(valid => valid !== false);
    }

    const getParishInputPlaceholder = (country) => {
        switch (country) {
            case "Jamaica": return "Enter parish";
            case "United States of America": return "Enter state";
            case "Canada": return "Enter province";
            case "United Kingdom": return "Enter county"
            default: return "Enter state"
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Billing Address</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.inputTitle}>COUNTRY</Text>
                <InputWithCustomPicker
                    value={country}
                    placeholder={"Select a country"}
                >
                    <CountryPicker
                        country={country}
                        setCountry={setCountry}
                    />
                </InputWithCustomPicker>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputTitle}>ADDRESS</Text>
                <DoubleTextInput
                    topFilters={[isAlphanumericWithBlankspace]}
                    bottomFilters={[isAlphanumericWithBlankspace]}
                    setValueTop={setAddressLine1}
                    setValueBottom={setAddressLine2}
                    topValid={isAddressLine1Valid}
                    bottomValid={isAddressLine2Valid}
                    setTopValid={setIsAddressLine1Valid}
                    setBottomValid={setIsAddressLine2Valid}
                    placeholderTop="Street address"
                    placeholderBottom="Apt, Suite, Unit, (Optional)"
                    topMinLength={3}
                    topMaxLength={30}
                    bottomMinLength={3}
                    bottomMaxLength={30}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputTitle}>CITY</Text>
                <InputText
                    minLength={3}
                    maxLength={25}
                    setExtracted={setCity}
                    editable
                    placeholder={"Enter the city"}
                    inputValidationFilters={[isAlphanumericWithBlankspace]}
                    valid={isCityValid}
                    setValid={setIsCityValid}
                    keyboardType="default"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputTitle}>PARISH/STATE</Text>
                <InputWithCustomPicker
                    value={parish}
                    placeholder={getParishInputPlaceholder(country)}
                >
                    <ParishOrStatePicker
                        country={country}
                        parish={parish}
                        setParishOrState={setParish}
                    />
                </InputWithCustomPicker>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputTitle}>ZIP/POST CODE</Text>
                <InputText
                    editable
                    setExtracted={setZipCode}
                    placeholder={"(Optional)"}
                    inputValidationFilters={[isAlphanumeric]}
                    valid={isZipCodeValid}
                    setValid={setIsZipCodeValid}
                    minLength={4}
                    maxLength={7}
                    keyboardType="default"
                />
            </View>
        </View>
    )
}

export default BillingAddress;