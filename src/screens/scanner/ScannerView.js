import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Header from '../../component/Header';
import ScannerViewModel from './ScannerViewModel';
import { Camera } from 'react-native-vision-camera';
import Spacer from '../../component/Spacer';


const ScannerView = () => {

    const {
        scanInfo,
        setScanInfo,
        showCamera,
        device,
        camera,
        codeScanner,
        setShowCamera
    } = ScannerViewModel();

    if (device == null) {
        return <Text style={styles.message}>Camera not available</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Scan"} drawer />

            <View style={styles.cameraContainer}>
                {
                    showCamera &&
                    <Camera
                        ref={camera}
                        style={{ width: "100%", height: "100%" }}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                    // photo={true}
                    />
                }
            </View>

            {
                scanInfo &&
                <View style={styles.scannedSection}>
                    <Text style={styles.scannedText}>Scanned Data</Text>
                    <Text style={styles.scannedText}>{scanInfo}</Text>
                </View>
            }
            {
                !showCamera && <TouchableOpacity style={styles.fpButton} onPress={() => {
                    setScanInfo(null);
                    setShowCamera(true)
                }}>
                    <Text>Scan</Text>
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
    },
    camera: {
        flex: 1,
    },
    message: {
        textAlign: 'center',
    },
    scannedText: {
        textAlign: 'left'
    },
    cameraContainer: {
        height: 200, 
        width: 200, 
        alignSelf: 'center', 
        backgroundColor: '#000'

    },
    scannedSection: {
        width: "80%", 
        borderWidth: 1, 
        borderColor: "#000", 
        padding: 15,  
        alignSelf: 'center'
    }
});

export default ScannerView;