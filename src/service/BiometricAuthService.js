import * as LocalAuthentication from 'expo-local-authentication';

const checkSupportauthTypes = async () => {
    let types = [];
    try {
        types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
        console.error(error);
    }
    return types;
}

const checkBiometricEnroll = async () => {
    let isEnrolled = false;
    try {
        isEnrolled = await LocalAuthentication.isEnrolledAsync();
    } catch (error) {
        console.error(error);
    }
    return isEnrolled;
}

const scanBiometric = async () => {
    try {
        return LocalAuthentication.authenticateAsync({
            promptMessage: "Scan your finger",
            cancelLabel: "Cancl"
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    checkSupportauthTypes, checkBiometricEnroll, scanBiometric
}