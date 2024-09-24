import React from "react";
import { View, StyleSheet, Text, SafeAreaView, TextInput, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../../component/Spacer";
import Button from "../../component/Button";
import LoginViewModel from "./LoginViewModel";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Constants from 'expo-constants';

const Login = () => {
    const navigation = useNavigation();

    const {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors,
        passwordRef,
        handleSubmit,
        onSignUpClick,
        handleFingerPrint,
        bioEnrolled
    } = LoginViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={styles.container}>
                <Image source={require('../../assets/images/applogo.png')} style={styles.image} />
                <Spacer size={10} />
                <View style={styles.fieldContainer}>
                    <Text>Username</Text>
                    <Spacer size={10} />
                    <TextInput
                        placeholder="Enter Username"
                        testID="username"
                        accessibilityLabel="username"
                        style={[styles.input, errors.username && { borderColor: 'red' }]}
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType="next"
                        maxLength={30}
                        onSubmitEditing={() => {
                            // focus next field 
                            passwordRef.current.focus();
                        }}
                    />
                    <Spacer size={5} />
                    {errors.username && <Text style={styles.errorsText}>{errors.username}</Text>}
                </View>
                <Spacer size={15} />
                <View style={styles.fieldContainer}>
                    <Text>Pasword</Text>
                    <Spacer size={10} />
                    <TextInput
                        placeholder="Enter Password"
                        testID="password"
                        accessibilityLabel="password"
                        style={[styles.input, errors.password && { borderColor: 'red' }]}
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="next"
                        maxLength={30}
                        secureTextEntry={true}
                        ref={passwordRef}
                    />
                    <Spacer size={5} />
                    {errors.password && <Text style={styles.errorsText}>{errors.password}</Text>}
                </View>
                <Spacer size={15} />
                <Button
                    title={"Login"}
                    style={{ margin: 20, borderRadius: 10 }}
                    onPress={handleSubmit}
                />
                <Spacer size={7} />

                {bioEnrolled && <>
                    <Text style={{ alignSelf: "center" }}>---OR---</Text>
                    <Spacer size={7} />
                    <Button
                        title={"Login with Fingerprint"}
                        style={{ margin: 20, borderRadius: 10 }}
                        onPress={handleFingerPrint}
                        imageSource={require('../../assets/images/fingerprint.jpg')}
                    />
                </>}
                <Spacer size={15} />
                <Pressable onPress={onSignUpClick} style={{ alignSelf: "center" }}>
                    <Text style={{ textDecorationLine: "underline", color: "blue" }}>Sign Up</Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    fieldContainer: {
        paddingHorizontal: 20
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    image: {
        width: 150,
        height: 150,
        backgroundColor: "#fff",
        alignSelf: "center"
    },
    errorsText: {
        color: 'red',
    }
})

export default Login;