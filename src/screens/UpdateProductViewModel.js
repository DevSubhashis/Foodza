import { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const useUpdateProductViewModel = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const priceRef = useRef(null);

    const handleImagePick = (type) => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        const callback = (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };
                setImage(source);
                setUploadProgress(0);
                simulateUpload();
            }
        };

        if (type === 'library') {
            launchImageLibrary(options, callback);
        } else {
            launchCamera(options, callback);
        }
    };

    const simulateUpload = () => {
        let progress = 0;
        setUploadProgress(progress);
        const interval = setInterval(() => {
            progress += 0.1;
            setUploadProgress(progress);
            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 100);
    };

    const handleValidation = () => {
        let valid = true;
        let errors = {};

        if (!title) {
            errors.title = 'Title is required';
            valid = false;
        }
        if (!price) {
            errors.price = 'Price is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            Alert.alert('Form Submitted');
        } else {
            Alert.alert('Please fix the errors');
        }
    };

    return {
        title,
        setTitle,
        price,
        setPrice,
        image,
        uploadProgress,
        errors,
        priceRef,
        handleImagePick,
        handleValidation,
        handleSubmit,
    };
};

export default useUpdateProductViewModel;
