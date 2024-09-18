import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
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
        setShowCamera,
        scanImageUrl,
        setScanImageUrl
    } = ScannerViewModel();

    if (device == null) {
        return <Text style={styles.message}>Camera not available</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Scan"} drawer />
            <Spacer size={50} />
            <View style={styles.cameraContainer}>
                {
                    showCamera &&
                    <Camera
                        ref={camera}
                        style={{ width: "100%", height: "100%" }}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                        photo={true}
                    />
                }

                {scanImageUrl && (
                    <Image
                        source={{ uri: 'file://'+scanImageUrl }}
                        style={{ width: 200, height: 200 }}
                    />
                )}

            </View>

            {
                scanInfo &&
                <>
                    <Spacer size={30} />
                    <Text style={styles.scannedText}>Scanned Data</Text>
                    <Spacer size={10} />
                    <View style={styles.scannedSection}>
                        <Text style={styles.scannedText}>{scanInfo}</Text>
                    </View>
                </>
            }
            {
                !showCamera &&
                <>
                    <Spacer size={20} />
                    <TouchableOpacity style={styles.fpButton} onPress={() => {
                        setScanImageUrl(null);
                        setScanInfo(null);
                        setShowCamera(true)
                    }}>
                        <Text>Scan</Text>
                    </TouchableOpacity>
                </>
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
        textAlign: 'left',
        marginLeft: 15
    },
    cameraContainer: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#000'

    },
    scannedSection: {
        width: "95%",
        borderColor: "#000",
        padding: 15,
        alignSelf: "center",
        backgroundColor: "#EDEADE",
        borderRadius: 5
    }
});

export default ScannerView;