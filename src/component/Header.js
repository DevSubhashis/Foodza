import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useAppStore } from "../Store";

const Header = ({ title, onPress, addButton, drawer }) => {

    const navigation = useNavigation();
    const { getBackgroudColor, setHeaderBackgroundColor } = useAppStore((state) => state)

    return (
        <View style={[styles.header, { backgroundColor: getBackgroudColor() }]}>
            {
                drawer && <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}>
                    <Image source={require('./../assets/images/menu.png')} style={{ width: 30, height: 30, tintColor: "red" }} />
                </TouchableOpacity>
            }
            <Text style={styles.title}>{title}</Text>
            {
                addButton && <TouchableOpacity
                    style={styles.bttn}
                //onPress={onPress}
                onPress={()=>{
                    setHeaderBackgroundColor('red')
                }}
                >
                    <Text style={styles.bttnText}>Add</Text>
                </TouchableOpacity>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
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
