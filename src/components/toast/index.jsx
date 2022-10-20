import { StyleSheet } from 'react-native';

/*
  1. Create the config
*/
const styles = StyleSheet.create({
    successToast: {
        backgroundColor: "rgba(16, 16, 20, 0.85)",
        shadowColor: "0px -4px 24px rgba(0, 0, 0, 0.15)",
        borderLeftColor: "rgba(16, 16, 20, 0.85)"
    }
})

const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={styles.successToast}
        contentContainerStyle={{ paddingHorizontal: 15}}
        text1Style={{
          fontSize: 25,
          fontWeight: '400'
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),

    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
  
  /*
    2. Pass the config as prop to the Toast component instance
  */
  export function CustomToast(props) {
    return (
      <>
        
      </>
    );
  }