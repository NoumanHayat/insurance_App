import React from 'react';
import getCustomErrorText from '../../copy/CustomErrorText';

import BlankErrorModal from '../modals/errors/BlankErrorModal';

const MainErrorFallback = ({ error }) => {

    const errorText = getCustomErrorText("main");

    console.error("Main Error:: ", error)

    return (
        <BlankErrorModal
            customError={errorText}
            visible={true}
        />
    )
}

export default MainErrorFallback;