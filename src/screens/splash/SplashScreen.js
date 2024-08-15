import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();
    const DELEAY_VALUE = 2000;

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, DELEAY_VALUE);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/applogo.png')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    image: {
        width: 300,
        height: 300,
        backgroundColor: "#fff"
    }
})

export default SplashScreen;