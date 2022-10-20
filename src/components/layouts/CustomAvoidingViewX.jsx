import React, { useRef, useEffect } from 'react';
import { View, Keyboard, Platform  } from 'react-native';

const CustomAvoidingViewX = ({ children, upBy, styles, usingMB, usingMT, usingPT, usingPB }) => {

    const {
        paddingTop: initialPT,
        paddingBottom: initialPB,
        marginTop: initialMT,
        marginBottom: initialMB
    } = styles;

    const finalMT = initialMT - upBy;
    const finalPT = initialPT - upBy;
    const finalMB = initialMB + upBy;
    const finalPB = initialPB + upBy;

    const ref = useRef();

    const shiftUp = (ref) => {
        if(ref){
            ref.current.setNativeProps({
                style: {
                    marginTop: usingMT && finalMT,
                    marginBottom: usingMB && finalMB,
                    paddingTop: usingPT && finalPT,
                    paddingBottom: usingPB && finalPB
                }
            })
        }

    }

    const shiftDown = (ref) => {
        if(ref){
            ref.current.setNativeProps({
                style: {
                    marginTop: usingMT && initialMT,
                    marginBottom: usingMB && initialMB,
                    paddingTop: usingPT && initialPT,
                    paddingBottom: usingPB && initialPB
                }
            })
        }

    }

    useEffect(() => {
        if(Platform.OS == "ios"){
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
    },[])



    return (
        <View style={styles} ref={ref}>
            {children}
        </View>
    )
}

export default CustomAvoidingViewX;

