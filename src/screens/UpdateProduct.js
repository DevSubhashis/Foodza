import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Image, Alert } from "react-native";
import Header from '../component/Header';
import Spacer from '../component/Spacer';
import Button from '../component/Button';
import * as Progress from 'react-native-progress';
import useUpdateProductViewModel from './UpdateProductViewModel';

const UpdateProduct = () => {
    const {
        title,
        setTitle,
        price,
        setPrice,
        image,
        uploadProgress,
        errors,
        priceRef,
        handleImagePick,
        handleSubmit,
    } = useUpdateProductViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Add Product"} onPress={() => { }} />

            <View style={styles.fieldContainer}>
                <Text>Title</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Title"
                    testID="productTitle"
                    accessibilityLabel="productTitle"
                    style={[styles.input, errors.title && { borderColor: 'red' }]}
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                    onSubmitEditing={() => priceRef.current.focus()}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            </View>

            <View style={styles.fieldContainer}>
                <Text>Price</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Price"
                    testID="productPrice"
                    accessibilityLabel="productPrice"
                    keyboardType="decimal-pad"
                    style={[styles.input, errors.price && { borderColor: 'red' }]}
                    value={price}
                    onChangeText={setPrice}
                    ref={priceRef}
                />
                {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
            </View>

            <View style={styles.fieldContainer}>
                <Text>Image</Text>
                <Spacer size={10} />
                <View style={styles.imageContainer}>
                    {image && <Image source={image} style={styles.image} />}
                    {uploadProgress > 0 && uploadProgress < 1 && (
                        <Progress.Bar progress={uploadProgress} width={200} />
                    )}
                </View>
                <Spacer size={10} />
                <View style={styles.buttonRow}>
                    <Button
                        title="Pick from Library"
                        onPress={() => handleImagePick('library')}
                        style={styles.pickButton}
                    />
                    <Spacer size={10} horizontal />
                    <Button
                        title="Open Camera"
                        onPress={() => handleImagePick('camera')}
                        style={styles.pickButton}
                    />
                </View>
            </View>

            <Spacer size={20} />

            <View style={styles.buttonRow}>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    style={styles.addButtonStyle}
                    textStyle={styles.addTextStyle}
                />
                <Spacer size={10} horizontal />
                <Button
                    title="Cancel"
                    onPress={() => { }}
                    style={styles.cancelButtonStyle}
                    textStyle={styles.cancelTextStyle}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        padding: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    pickButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    addButtonStyle: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    addTextStyle: {
        fontSize: 16,
        color: 'yellow',
    },
    cancelButtonStyle: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    cancelTextStyle: {
        fontSize: 16,
        color: '#fff',
    },
});

export default UpdateProduct;
