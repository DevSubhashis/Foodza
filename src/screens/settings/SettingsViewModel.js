import { useRef, useState, useEffect } from "react";
import { Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../../service/AuthService";
import { storeData, getData, removeData } from "../../config/utils";
import { LOGIN_INFO, BIOMETRIC_INFO } from "../../constants/Config";
import { checkSupportauthTypes, checkBiometricEnroll, scanBiometric } from '../../service/BiometricAuthService';

const SettingsViewModel = () => {

    const [bioEnrolled, setBioEnrolled] = useState(false);

    useEffect(() => {
        checkBioSettings();
    }, []);

    const checkBioSettings = async () => {
        const result = await getData(BIOMETRIC_INFO);
        if (result && result.isBioMetricEnrolled) {
            setBioEnrolled(true);
        } else {
            setBioEnrolled(false);
        }
    }

    const handleFingerPrint = async () => {
        let supportedTypes = await checkSupportauthTypes();
        if (Array.isArray(supportedTypes) && supportedTypes.length > 0) {
            if (supportedTypes[0] === 1) { // 1: denotes FP
                const result = await scanBiometric();
                if (result.success) {
                    storeData(BIOMETRIC_INFO, { isBioMetricEnrolled: true });
                    setBioEnrolled(true);
                }
            }
        } else {
            Alert.alert("NO BIOMETRIC SUPPORT");
        }
    }

    const removeFingerPrintEnrollment = async() =>{
        await removeData(BIOMETRIC_INFO)
        setBioEnrolled(false);
    }

    return {
        handleFingerPrint,
        bioEnrolled,
        removeFingerPrintEnrollment
    }
}

export default SettingsViewModel;