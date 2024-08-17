import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_INFO } from "../../constants/Config";
import { getData } from "../../config/utils";

const SplashScreen = () => {
    const navigation = useNavigation();
    const DELEAY_VALUE = 2000;

    const checkLogin = async () => {
        const login_info = await getData(LOGIN_INFO);
        let PAGE_TO_REDIRECT = '';
        if (login_info) {
            PAGE_TO_REDIRECT = 'AppInnerStack';
        } else {
            PAGE_TO_REDIRECT = 'Login';
        }
        setTimeout(() => {
            navigation.navigate(PAGE_TO_REDIRECT);
        }, DELEAY_VALUE);
    }

    useEffect(() => {
        checkLogin();
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