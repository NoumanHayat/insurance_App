import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { demoListOfCountries } from '../../../lib/utils/countries';

const CountryPicker = ({ country, setCountry }) => {

    const styles = StyleSheet.create({
        picker: {
            width: "100%",
            opacity: 0
        }
    })
    const listOfCountryItems = demoListOfCountries.map((country) => {
        return { label: country, value: country }
    })

    return (
        <RNPickerSelect
            value={country}
            style={styles.picker}
            placeholder={{
                label: 'Country',
                value: null,
                color: "#2565BF",
            }}
            onValueChange={(itemValue) => {
                if (itemValue !== null) {
                    setCountry(itemValue)
                } else {
                    setCountry("")
                }
            }}
            items={listOfCountryItems}
        />
    )
}

export default CountryPicker;
