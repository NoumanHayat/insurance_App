import { useDispatch, batch } from "react-redux";
import {
    rdxSetIsErrorModalVisible,
    rdxSetErrorModalCustomError,
} from "../../../../store/v2/slices/errorModal";

import { getCustomErrorText } from "../../../copy/CustomErrorText";

export const useHandleTopLevelAxiosError = () => {

    const displayErrorModal = useDisplayErrorModal();
    const hideErrorModal = useHideErrorModal();

    return (err, blueBtnCallback) => {

        const { status } = err;
        displayErrorModal(status ?? 400, blueBtnCallback, hideErrorModal)
    }
}

export const useShowErrorModal = () => {

    const dispatch = useDispatch();

    return (customError) => {
        batch(() => {
            dispatch(rdxSetErrorModalCustomError(customError));
            dispatch(rdxSetIsErrorModalVisible(true))
        })
    }
}

export const useDisplayErrorModal = () => {

    const showErrorModal = useShowErrorModal()

    return (key, blueBtnCallback, greyBtnCallback) => {
        let customError = getCustomErrorText(key);
        customError = { ...customError, blueBtnCallback, greyBtnCallback }
        showErrorModal(customError)
    }
}

export const useHideErrorModal = () => {

    const dispatch = useDispatch();

    return () => {
        dispatch(rdxSetIsErrorModalVisible(false));
    }
}