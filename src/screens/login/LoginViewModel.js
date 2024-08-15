import { useRef, useState } from "react";
import { Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../../service/AuthService";


const LoginViewModel = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const passwordRef = useRef(null);
    const navigation = useNavigation();
    const [showLoader, setShowLoader] = useState(false);

    const handleValidation = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = "Username is required";
            valid = false;
        }

        if (!password) {
            errors.password = "Pasword is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    }

    const handleSubmit = async () => {
        setShowLoader(true);
        if (handleValidation()) {
            // from submitted
            const loginresponse = await AuthService.doLogin({ username , password });
            console.log(loginresponse.token);
            //navigateToListPage();
            setShowLoader(false);
        } else {
            Alert.alert("ERROR");
        }
    }

    const navigateToListPage = () => {
        navigation.navigate('ProductHome');
    }

    const onSignUpClick = () => {
        Linking.openURL('https://reactnative.dev/docs/pressable')
    }


    return {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors,
        passwordRef,
        handleSubmit,
        onSignUpClick,
        showLoader
    }
}

export default LoginViewModel;