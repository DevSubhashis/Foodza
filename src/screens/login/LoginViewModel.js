import React, { useRef, useState } from "react";
import { Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../../service/AuthService";
import { storeData , getData } from "../../config/utils";
import { LOGIN_INFO, BIOMETRIC_INFO } from "../../constants/Config";
import { checkSupportauthTypes, checkBiometricEnroll, scanBiometric } from '../../service/BiometricAuthService';
import { useFocusEffect } from "@react-navigation/native";
import { useProductContext } from "../../context/ProductContext";

const LoginViewModel = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const passwordRef = useRef(null);
    const navigation = useNavigation();
    const [bioEnrolled, setBioEnrolled] = useState(false);

    const { setLoader } = useProductContext();

    useFocusEffect(
        React.useCallback(() => {
            checkBioSettings();
        }, [])
    );

    const checkBioSettings = async () => {
        const result  = await getData(BIOMETRIC_INFO);
        if(result && result.isBioMetricEnrolled){
            setBioEnrolled(true);
        } else {
            setBioEnrolled(false);
        }
    }

    const handleValidation = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = "Username is required";
            valid = false;
        }

        if (!password) {
            errors.password = "Pasword is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    }

    const handleSubmit = async () => {
        setLoader(true);
        if (handleValidation()) {
            // from submitted
            const loginresponse = await AuthService.doLogin({ username , password });
            storeData(LOGIN_INFO, { username, token: loginresponse.token });
            navigateToListPage();
            setLoader(false);
        } else {
            Alert.alert("ERROR");
        }
    }

    const navigateToListPage = () => {
        navigation.navigate('AppInnerStack');
    }

    const onSignUpClick = () => {
        Linking.openURL('https://reactnative.dev/docs/pressable')
    }

    const handleFingerPrint = async () => {
        let supportedTypes  = await checkSupportauthTypes();
        if(Array.isArray(supportedTypes) && supportedTypes.length > 0){
            if(supportedTypes[0] === 1){ // 1: denotes FP
                // my device support FP
                // const isEnroll = await checkBiometricEnroll();
                // console.log("isEnroll ", isEnroll);
                const result = await scanBiometric();
                if(result.success){
                    storeData(BIOMETRIC_INFO, { isBioMetricEnrolled: true });
                    navigateToListPage();
                }
            }
        } else {
            Alert.alert("NO BIOMETRIC SUPPORT");
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors,
        passwordRef,
        handleSubmit,
        onSignUpClick,
        handleFingerPrint,
        bioEnrolled
    }
}

export default LoginViewModel;