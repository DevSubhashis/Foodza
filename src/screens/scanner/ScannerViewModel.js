import React, { useEffect, useRef, Linking, useState } from 'react';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';



const ScannerViewModel = () => {

    const device = useCameraDevice('back');
    const [scanInfo, setScanInfo] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const camera = useRef(null);

    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${permission}`);
            if (permission === 'denied') await Linking.openSettings();
        }
        getPermission();
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'ean-8'],
        onCodeScanned: (codes) => {
            console.log(JSON.stringify(codes));
            console.log(codes[0].type);
            console.log(codes[0].value);
            setScanInfo(codes[0].value);
            //doTakePicture();
            setShowCamera(false);
        }
    })


    // const doTakePicture = async () => {
    //     if (camera.current !== null) {
    //         const photo = await camera.current.takePhoto({});
    //         console.log(photo.path);
    //         setShowCamera(false);
    //     }
    // }

    return {
        scanInfo,
        setScanInfo,
        showCamera,
        device,
        camera,
        codeScanner,
        setShowCamera
    }
}

export default ScannerViewModel;