import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import getCustomErrorText from '../../copy/CustomErrorText';

import BlankErrorModal from '../modals/errors/BlankErrorModal';

const ErrorFallback = ({ error }) => {

    const [isModalVisible, setIsModalVisible] = useState(true);

    const navigation = useNavigation();
    
    const navigateToSignIn = () => {
        navigation.navigate("SignIn");
        hideErrorModal()
    }

    const hideErrorModal = () => {
        setIsModalVisible(false)
    }

    const errorText = getCustomErrorText("screen");
    const customError = { ...errorText, blueBtnCallback: navigateToSignIn, greyBtnCallback: hideErrorModal }

    console.error("Screen Error:: ", error)

    return (
        <BlankErrorModal
            customError={customError}
            visible={isModalVisible}
            setVisible={setIsModalVisible}
        />
    )
}

export default ErrorFallback;