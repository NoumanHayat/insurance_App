const CustomErrorText = {
    "4xx": {
        title: "Request Failed",
        message: "Please re-check the information that you have submitted and try again.",
        blueBtnText: "Try Again",
        greyBtnText: "Dismiss"
    },
    "5xx": {
        title: "Request Failed",
        message: "Our service is temporarily unavailable. Please try again later.",
        blueBtnText: "Try Again",
        greyBtnText: "Dismiss"
    },
    generic: {
        title: "Something has gone wrong",
        message: "Please try again. If the problem persists, please contact technical support.",
        blueBtnText: "Try Again",
        greyBtnText: "Dismiss"
    },
    network: {
        title: "Network failure",
        message: "Please try again. If the problem persists, please contact technical support.",
        blueBtnText: "Try Again",
        greyBtnText: "Dismiss"
    },
    missing: {
        title: "Something has gone wrong",
        message: "It appears that we were unable to retrieve all of your data. Please sign in again. If the problem persists, please contact technical support.",
        blueBtnText: "Sign in",
        greyBtnText: "Dismiss"
    },
    screen: {
        title: "Something has gone wrong",
        message: "Please sign in again. If the problem persists, please contact technical support",
        blueBtnText: "Sign In",
        greyBtnText: "Dismiss"
    },
    main: {
        title: "Something has gone wrong",
        message: "Please re-load the app and try again. If the problem persists, please contact technical support",
        blueBtnText: "",
        greyBtnText: ""
    }
}

export const getCustomErrorText = (key) => {
    if(typeof key == "number"){
        if(key >= 400 && key < 500) return CustomErrorText["4xx"]
        if(key >= 500) return CustomErrorText["5xx"]
    } else if(Object.keys(CustomErrorText).includes(key)){
        return CustomErrorText[key];
    } else {
        return CustomErrorText["generic"]
    }
}

export default getCustomErrorText;