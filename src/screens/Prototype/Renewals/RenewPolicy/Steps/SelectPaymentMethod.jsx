import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserContext from '../../../../../context/context';
import AddPaymentMethod from "./SelectPaymentMethod/AddPaymentMethod";
import PaymentMethodSavedModal from '../../../../../components/modals/renewals/PaymentMethodSavedModal';
import ScrollViewWithFade from '../../../../../components/scrollviews/ScrollViewWithFade';
import DashedLine from '../../../../../components/renewals/AddBenefits/DashedLine';
import BillingAddress from "./SelectPaymentMethod/BillingAddress";

const SelectPaymentMethod = ({ paymentMethodLocal, setPaymentMethodLocal, billingAddress, setBillingAddress }) => {

  const { height, width } = useWindowDimensions();
  const { modelX, modelY } = useContext(UserContext);
  // eslint-disable-next-line
  const ratioX = width / modelX;
  const ratioY = height / modelY;

  const navigation = useNavigation();

  const [isBillingAddressValid, setIsBillingAddressValid] = useState(false);
  const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(false);

  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingBottom: 56 * ratioY,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF",
      alignSelf: "center",
      marginTop: 25 * ratioY,
      marginBottom: 35 * ratioY,
    },

  });

  /** Checking if all the data entered is valid */
  // useEffect(() => {
  //   if (isPaymentMethodValid && isBillingAddressValid) {
  //     setPaymentMethodLocal({
  //       paymentMethodLocal,
  //       // billingAddress
  //     })
  //   }
  // }, [isPaymentMethodValid, isBillingAddressValid])

  const onContinuePressed = () => {
    navigation.navigate("ConfirmRenewal");
    setIsSaveModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
        {/* Rearrangment for temporary card details fix */}
        <AddPaymentMethod
          setIsPaymentMethodValid={setIsPaymentMethodValid}
          setPaymentMethodLocal={setPaymentMethodLocal}
        />
        <DashedLine />
        <BillingAddress
          setBillingAddress={setBillingAddress}
          setIsBillingAddressValid={setIsBillingAddressValid}
        />
      </ScrollViewWithFade>

      <PaymentMethodSavedModal
        visible={isSaveModalVisible}
        setVisible={setIsSaveModalVisible}
        onContinuePress={onContinuePressed}
      />
    </View>
  )
}

export default SelectPaymentMethod
