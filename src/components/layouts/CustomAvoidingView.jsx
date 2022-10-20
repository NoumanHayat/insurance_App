import React, { useRef, useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';

const CustomAvoidingView = ({ children, upBy, styles, useHeight }) => {

    const ref = useRef();

    let shiftUp = (ref) => {
        if (ref) {
            ref.current.setNativeProps({
                style: {
                    transform: [
                        { translateY: -upBy }
                    ]
                }
            })
        }

    }


    let shiftDown = (ref) => {
        if (ref) {
            ref.current.setNativeProps({
                style: {
                    transform: [
                        { translateY: 0 }
                    ]
                }
            })
        }

    }

    if(useHeight){
        shiftUp = (ref) => {
            if(ref){
                ref.current.setNativeProps({
                    style: {
                        height: styles.height - upBy
                    }
                })
            }
        }

        shiftDown = (ref) => {
            if(ref){
                ref.current.setNativeProps({
                    style: {
                        height: styles.height
                    }
                })
            }
        }
    }


    useEffect(() => {
        if (Platform.OS == "ios") {
            const upListener = Keyboard.addListener("keyboardWillShow", () => {
                shiftUp(ref);
            })
            const downListener = Keyboard.addListener("keyboardWillHide", () => {
                shiftDown(ref);
            })
            return () => {
                upListener.remove();
                downListener.remove();
            }
        } else {
            const upListener = Keyboard.addListener("keyboardDidShow", () => {
                shiftUp(ref);
            })
            const downListener = Keyboard.addListener("keyboardDidHide", () => {
                shiftDown(ref);
            })
            return () => {
                upListener.remove();
                downListener.remove();
            }
        }
    }, [])



    return (
        <View style={styles} ref={ref}>
            {children}
        </View>
    )
}

export default CustomAvoidingView;

