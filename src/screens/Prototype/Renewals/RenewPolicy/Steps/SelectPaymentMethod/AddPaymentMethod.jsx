import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

// import InputDate from '../../../../../../components/inputs/InputDate';
import InputText from '../../../../../../components/inputs/InputTextV2';
import { isAlphabeticalWithBlankspace, isNumeric } from '../../../../../../lib/utils/input validation/general';
import { getCustomShortDate } from '../../../../../../lib/utils/formatters';

import UserContext from '../../../../../../context/context';
import CustomDate from '../../../../../../components/inputs/CustomDate';

const AddPaymentMethod = ({ setIsPaymentMethodValid, setPaymentMethodLocal }) => {  

  const { height, width } = useWindowDimensions();
  const { modelX, modelY } = useContext(UserContext);
  // eslint-disable-next-line
  const ratioX = width / modelX;
  const ratioY = height / modelY;

  const [expiryDate, setExpiryDate] = useState(new Date("01/01/1997"));
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCvv] = useState("");

  const [cardHolderValid, setCardHolderValid] = useState(false);
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [cvvValid, setCvvValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);

  const paymentMethodValids = [cardHolderValid, cardNumberValid, cvvValid, isExpiryDateValid];


  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    text: {
      color: "#8D9AA5",
      marginBottom: 4 * ratioY,
      fontSize: 10 * ratioY,
    },
    inputGroup: {
      marginBottom: 20 * ratioY,
    },
    doubleInputGroup: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    subGroup: {
      width: "45%"
    }
  });

  useEffect(() => {
    const isPaymentMethodValid = areAllValid(paymentMethodValids);
    if(isPaymentMethodValid){
      setIsPaymentMethodValid(true)
      setPaymentMethodLocal({cardHolder, cardNumber, expiryDate, cvv});
    }
  },[cardHolderValid, cardNumberValid, isExpiryDateValid , cvvValid])
  

  useEffect(() => {
    setIsExpiryDateValid(!expiryDate ? false : true);
  }, [expiryDate])

  const areAllValid = (valids) => {
    return valids.every(valid => valid !== false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.text}>CARDHOLDER NAME</Text>
        <InputText
          editable
          valid={cardHolderValid}
          setValid={setCardHolderValid}
          setExtracted={setCardHolder}
          placeholder="Name on Card"
          keyboardType="default"
          minLength={5}
          maxLength={30}
          inputValidationFilters={[isAlphabeticalWithBlankspace]}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.text}>CARD NUMBER</Text>
        <InputText
          editable
          valid={cardNumberValid}
          setValid={setCardNumberValid}
          setExtracted={setCardNumber}
          placeholder="---- ---- ---- ---- ----"
          keyboardType="number-pad"
          minLength={16}
          maxLength={16}
          inputValidationFilters={[isNumeric]}
        />
      </View>
      <View style={[styles.inputGroup, styles.doubleInputGroup]}>
        <View style={styles.subGroup}>
          <Text style={styles.text}>EXPIRATION DATE</Text>
          <CustomDate
            date={getCustomShortDate(expiryDate)}
            setDate={setExpiryDate}
            expiration={true}
          />
        </View>
        <View style={styles.subGroup}>
          <Text style={styles.text}>CVV</Text>
          <InputText
            editable
            valid={cvvValid}
            setValid={setCvvValid}
            setExtracted={setCvv}
            placeholder="---"
            keyboardType="number-pad"
            minLength={3}
            maxLength={3}
            inputValidationFilters={[isNumeric]}
          />
        </View>
      </View>
    </View>
  )
}

export default AddPaymentMethod;
