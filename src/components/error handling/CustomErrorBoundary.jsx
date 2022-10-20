import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    styles = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: "#000",
            padding: 25,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    /** Look into error logging best practices */
    // eslint-disable-next-line
    componentDidCatch(error, errorInfo) {
        //   You can also log the error to an error reporting service
        //   logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <View style={this.styles.container}>
                    <Text>Something went wrong.</Text>
                </View>
            )
        }

        return this.props.children;
    }
}