import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux';
import UserContext from '../../../../../context/context'

import { 
    getName,
	getEmail,
	getPhoneNumbers,
    getTrn,
} from '../../../../../../store/v2/slices/user';
import InputPhoneNum from '../../../../../components/inputs/InputPhoneNumV2'
import InputEmail from '../../../../../components/inputs/InputEmail'
import InputTRN from '../../../../../components/inputs/InputTRN'
import ScrollViewWithFade from '../../../../../components/scrollviews/ScrollViewWithFade'
import InputText from '../../../../../components/inputs/InputText';
import InputTextV4 from '../../../../../components/inputs/InputTextV4';
import InputTextV3 from '../../../../../components/inputs/InputTextV3';

const DriverDetails = ({ params: userResponse }) => {
    const name = useSelector(getName);
    const lastname = name.split(" ").pop();
    const firstname = name.split(" ").shift();
    const userTrn = useSelector(getTrn);
	const emailAddress = useSelector(getEmail);
	const phoneNumber = useSelector(getPhoneNumbers)[0].phone_number;

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const [fname, setFname] = useState(userResponse ? firstname: '');
    const [fnameValid, setFnameValid] = useState(false);

    const [lname, setLname] = useState(userResponse ? lastname: '');
    const [lnameValid, setLnameValid] = useState(false);

    const [phoneNum, setPhoneNum] = useState(userResponse ? phoneNumber: '');
    const [phoneNumValid, setPhoneNumValid] = useState(false);

    const [email, setEmail] = useState(userResponse ? emailAddress: '');
    const [emailValid, setEmailValid] = useState(false);

    const [trn, setTrn] = useState(userResponse ? userTrn: '');
    const [trnValid, setTrnValid] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);

    
    const styles = StyleSheet.create({
        formContainer: {
            paddingHorizontal: 24,
            flex: 1
        },
        fieldset: {
            marginBottom: 24 * ratioY,
        },
        label: {
            fontSize: 10,
            height: 10,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#8D9AA5',
            marginBottom: 10,
        },
        descriptionLabel: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 160 * ratioY,
        }, 
        row: {
            flexDirection: 'row',
            flex: 1,
        }
    });

    return (
        <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
        <View style={styles.formContainer}>
            <View style={styles.fieldset}>
                <Text style={styles.label}>First Name</Text>
                <InputTextV4
                    inputHeight={48}
                    placeholder='Enter first name'
                    keyboardType="default"
                    setExtracted={setFname}
                    valid={fnameValid}
                    setValid={setFnameValid}
                    editable={ userResponse ? false : true }
                    background="#4B5563"
                />
                
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.label}>Last Name</Text>
                <InputTextV4
                    inputHeight={48}
                    placeholder='Enter last name'
                    keyboardType="default"
                    setExtracted={setLname}
                    valid={lnameValid}
                    setValid={setLnameValid}
                    editable={ userResponse ? false : true }
                    background="#4B5563"
                />
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.label}>Phone</Text>
                <InputPhoneNum
                    placeholder='Enter contact number'
                    pageColour='#1F2937'
                    setExtracted={setPhoneNum}
                    valid={phoneNumValid}
                    setValid={setPhoneNumValid}
                    editable={ userResponse ? false : true }
                />
                
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.label}>Email</Text>
                <InputEmail
                    placeholder='Enter email address'
                    pageColour='#1F2937'
                    setExtracted={setEmail}
                    valid={emailValid}
                    setValid={setEmailValid}
                    editable={ userResponse ? false : true }
                />
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.label}>TRN</Text>
                <InputTRN
                    pageColour='#1F2937'
                    value={trn}
                    setValue={setTrn}
                    valid={trnValid}
                    setValid={setTrnValid}
                    editable={ userResponse ? false : true }
                    // onFocus,
                    // hidePopup,
                />
                
            </View>
            <View style={styles.fieldset}>
                <View style={styles.descriptionLabel}>
                    <Text style={styles.label}>Description of Injuries</Text>
                    <Text style={styles.label}>(Optional)</Text>
                </View>
                <InputTextV3
                    inputHeight={310}
                    placeholder='Describe the injuries from the incident in detail'
                    keyboardType="default"
                    setExtracted={setDescription}
                    valid={descriptionValid}
                    setValid={setDescriptionValid}
                    editable
                    BGColor={true}
                />
            </View>
        </View>
        </ScrollViewWithFade>
    )
}

export default DriverDetails

