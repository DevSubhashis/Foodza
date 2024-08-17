import AsyncStorage from '@react-native-async-storage/async-storage';
//import CryptoJS from "react-native-crypto-js";

//const SECRECT_KEY = 'FOODZA';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
//        let ciphertext = CryptoJS.AES.encrypt(jsonValue, SECRECT_KEY).toString();
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

export const getData = async (key) => {
    try {
        let jsonValue = await AsyncStorage.getItem(key);
        if(jsonValue != null && jsonValue != undefined && jsonValue != ''){
//            jsonValue  = CryptoJS.AES.decrypt(jsonValue, SECRECT_KEY);
            return JSON.parse(jsonValue);
        }
        return null;
    } catch (e) {
        console.error(e);
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e);
    }
}