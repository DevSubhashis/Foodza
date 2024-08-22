import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from '../../component/Header';
import SettingsViewModel from './SettingsViewModel';


const Settings = () => {

    const {
        handleFingerPrint,
        bioEnrolled,
        removeFingerPrintEnrollment
    } = SettingsViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Settings"} drawer />

            {
                bioEnrolled ?
                    <>
                        <Text style={{ alignSelf: "center", marginTop: 100 }}>Bio Metric Enrolled</Text>
                        <TouchableOpacity style={styles.fpButton} onPress={removeFingerPrintEnrollment}>
                            <Text>Remove Fingerprint Enrollment</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <TouchableOpacity style={styles.fpButton} onPress={handleFingerPrint}>
                        <Text>Configure Fingerprint</Text>
                    </TouchableOpacity>
            }


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fpButton: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 100,
        borderWidth: 1,
        padding: 15,
        width: '75%',
        alignSelf: "center",
        borderRadius: 5
    }
});

export default Settings;