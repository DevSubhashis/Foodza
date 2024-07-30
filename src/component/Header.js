import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const Header = ({ title, onPress, addButton }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {
                addButton && <TouchableOpacity style={styles.bttn} onPress={onPress}>
                    <Text style={styles.bttnText}>Add</Text>
                </TouchableOpacity>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#6200ee',
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    title: {
        color: "#fff",
        fontSize: 20
    },
    bttn: {
        borderColor: 'blue',
        borderWidth: 1,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    bttnText: {
        color: "#fff",
        fontSize: 16
    }
})

export default Header;
