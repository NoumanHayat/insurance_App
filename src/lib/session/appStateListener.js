import { AppState } from "react-native";

export const createAppStateListener = (activeCallback, inactiveCallback) => {
    const subscription = AppState.addEventListener("change", (nextState) => {
        if(nextState == "active"){
            activeCallback()
        } else if(nextState.match(/inactive|background/)){
            inactiveCallback();
        }
    })
    return subscription;
}