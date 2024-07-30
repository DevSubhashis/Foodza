import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ text, onPress, ...props }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.bttnStyle}>
            <Text style={styles.buttnText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bttnStyle: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: "center",
        padding: 15
    },
    buttnText: {
        color: 'red'
    }
});

export default Button;