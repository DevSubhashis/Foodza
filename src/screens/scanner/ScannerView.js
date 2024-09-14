import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Header from '../../component/Header';
import ScannerViewModel from './ScannerViewModel';


const ScannerView = () => {

    const {
        handleScanner,
        scanInfo,
        isCameraOpen,
        facing,
        permission,
        requestPermission,
        setIsCameraOpen,
        setScanInfo
    } = ScannerViewModel();

    // if (!permission) {
    //     // Camera permissions are still loading.
    //     return <View />;
    // }

    // if (!permission.granted) {
    //     // Camera permissions are not granted yet.
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.message}>We need your permission to show the camera</Text>
    //             <Button onPress={requestPermission} title="grant permission" />
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Scan"} drawer />
            {
                !isCameraOpen && <TouchableOpacity style={styles.fpButton} onPress={requestPermission}>
                    <Text>Scan</Text>
                </TouchableOpacity>
            }

            {
                isCameraOpen &&
                <CameraView
                    style={styles.camera} facing={facing}
                    onCameraReady={() => {
                        setIsCameraOpen(true);
                    }}
                    barcodeScannerSettings={{
                        barcodeTypes: ['aztec' | 'ean13' | 'ean8' | 'qr' | 'pdf417' | 'upc_e' | 'datamatrix' | 'code39' | 'code93' | 'itf14' | 'codabar' | 'code128' | 'upc_a'],
                    }}
                    onBarcodeScanned={(result)=>{
                        console.log(result.data);
                        console.log(result.type);
                        setScanInfo(result.data);
                    }}
                >

                </CameraView>
            }

            {
                scanInfo && <Text>scanInfo</Text>
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
        paddingBottom: 10,
    },
});

export default ScannerView;