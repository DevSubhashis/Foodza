import React from 'react';
// import { useState } from "react";
import {  useCameraPermissions } from 'expo-camera';



const ScannerViewModel = () => {

    const [facing, setFacing] = React.useState('back');
    const [scanInfo, setScanInfo] = React.useState(null);
    const [isCameraOpen, setIsCameraOpen] = React.useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    const handleScanner = () => {

    }

    // const toggleCameraFacing = () => {
    //     setFacing(current => (current === 'back' ? 'front' : 'back'));
    // }

    return {
        handleScanner,
        scanInfo,
        isCameraOpen,
        facing,
        permission,
        requestPermission,
        setIsCameraOpen,
        setScanInfo
    }
}

export default ScannerViewModel;