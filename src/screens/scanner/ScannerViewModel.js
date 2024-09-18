import React, { useEffect, useRef, Linking, useState } from 'react';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import ImageEditor from '@react-native-community/image-editor';


const ScannerViewModel = () => {

    const device = useCameraDevice('back');
    const [scanInfo, setScanInfo] = useState(null);
    const [scanImageUrl, setScanImageUrl] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const camera = useRef(null);
    const flag = useRef(true);

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
            setScanInfo(codes[0].value);
            if (flag.current) {
                doTakePicture(codes[0]);
            }
        }
    })


    const doTakePicture = async (codes) => {
        flag.current = false;
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({
                qualityPrioritization: 'quality',
                flash: 'off',
                skipMetadata: false,
            });
            console.log("path ", photo);
           // console.log(frame);
            const cropData = {
                offset: { x: codes.corners[0].x, y: codes.corners[0].y },        // Start point of the QR/Barcode
                size: { width: 3120, height: 4160 }, // Size of the QR/Barcode
                //displaySize: { width: frame.width, height: frame.height }, // Preserve the aspect ratio
                resizeMode: 'contain',
            };

            const croppedImage = await ImageEditor.cropImage('file:///' + photo.path, cropData);
            console.log("cropped path ", croppedImage.path);

            setScanImageUrl(croppedImage.path);
            setShowCamera(false);
            flag.current = true;
        }
    }

    return {
        scanInfo,
        setScanInfo,
        showCamera,
        device,
        camera,
        codeScanner,
        setShowCamera,
        scanImageUrl,
        setScanImageUrl
    }
}

export default ScannerViewModel;