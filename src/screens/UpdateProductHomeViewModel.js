import { useRef, useState } from "react";
import { Alert } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProductService from "../service/ProductService";
import { useNavigation } from "@react-navigation/native";

const UpdateProductHomeViewModel = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const priceRef = useRef(null);
    const navigation = useNavigation();
    const [showLoader, setShowLoader] = useState(false);

    const handleValidation = () => {
        let valid = true;
        let errors = {};

        if (!title) {
            errors.title = "Product title is required";
            valid = false;
        }

        if (!price) {
            errors.price = "Product price is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    }

    const handleSubmit = async () => {
        setShowLoader(true);
        if (handleValidation()) {
            // from submitted
            const addProduct = await ProductService.addProduct({
                title: title,
                price: price,
                image: image
            });
            console.log(addProduct); // addProduct.id
            navigateToListPage();
            setShowLoader(false);
        } else {
            Alert.alert("ERROR");
        }
    }

    const navigateToListPage = () => {
        navigation.navigate('ProductHome');
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    const handleImagePick = async (type) => {
        const options = {
            mediaType: 'photo',
            includeBase64: true
        };

        const resultHandler = (result) => {
            if (result.didCancel) {
                console.error("User Cancelled");
            } else if (result.errorCode) {
                console.error("Error ", result.errorMessage);
            } else {

                const fileSize = result.assets[0].fileSize; // bytes
                const fileSizeMB = fileSize / (1024 * 1024); // MB

                if (fileSizeMB > 2) {
                    Alert.alert("File Size Error", "Plz select image lower than 2 MB");
                    return;
                }

                const source = { uri: 'data:image/jpeg;base64,' + result.assets[0].base64 }
                setImage(source);
                uploadImage();
            }
        }

        if (type === 'library') {
            // open image lib
            const result = await launchImageLibrary(options);
            resultHandler(result);
        } else {
            // open camera
            const result = await launchCamera(options);
            resultHandler(result);
        }
    }
    const uploadImage = () => {
        // upload image
    }


    return {
        title,
        setTitle,
        price,
        setPrice,
        image,
        setImage,
        errors,
        setErrors,
        priceRef,
        handleSubmit,
        handleImagePick,
        handleCancel,
        showLoader
    }
}

export default UpdateProductHomeViewModel;