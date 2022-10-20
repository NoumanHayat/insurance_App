import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { listOfUSAStates, listOfJamaicanParishes, 
    listOfCanadianProvincesAndTerritories, listOfUkCounties } from '../../../lib/utils/countries';

const ParishOrStatePicker = ({ country, parishOrState, setParishOrState }) => {

    const styles = StyleSheet.create({
        picker: {
            width: "100%",
            opacity: 0
        }
    })

    const getUnits = (country) => {
        switch(country){
            case "Jamaica": return listOfJamaicanParishes;
            case "United States of America": return listOfUSAStates;
            case "Canada": return listOfCanadianProvincesAndTerritories;
            case "United Kingdom": return listOfUkCounties;
            default: return listOfJamaicanParishes;
        }
    }

    const items = getUnits(country);


    return (
        <RNPickerSelect
            value={parishOrState}
            style={styles.picker}
            placeholder={{
                label: 'Country',
                value: null,
                color: "#2565BF",
            }}
            onValueChange={(itemValue) => {
                if (itemValue !== null) {
                    setParishOrState(itemValue)
                } else {
                    setParishOrState("")
                }
            }}
            items={items}
        />
    )
}

export default ParishOrStatePicker;
