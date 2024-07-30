// UpdateProduct.js
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from '../component/Header';
import Spacer from '../component/Spacer';
import Button from '../component/Button';
import UpdateProductHomeViewModel from './UpdateProductHomeViewModel';
import { useRoute } from '@react-navigation/native';

const UpdateProduct = () => {
    const route = useRoute();

    const {
        productID,
        setProductID,
        title,
        setTitle,
        price,
        setPrice,
        image,
        setImage,
        errors,
        priceRef,
        handleSubmit,
        handleImagePick
    } = UpdateProductHomeViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Add Product"} onPress={() => { }} />

            <View style={styles.fieldContainer}>
                <Text>ProductID: {route.params?.productID}</Text>
                <Text>Title</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Title"
                    testID="prouctTitle"
                    accessibilityLabel="prouctTitle"
                    style={[styles.input, errors.title && { borderColor: 'red' }]}
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                    maxLength={30}
                    onSubmitEditing={() => {
                        // focus next field 
                        //priceRef.current.focus();
                    }}
                />
                {errors.title && <Text style={styles.errorsText}>{errors.title}</Text>}
            </View>

            <View style={styles.fieldContainer}>
                <Text>Price</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Price"
                    testID="prouctPrice"
                    accessibilityLabel="prouctPrice"
                    keyboardType={"decimal-pad"}
                    style={[styles.input, errors.price && { borderColor: 'red' }]}
                    ref={priceRef}
                    value={price}
                    onChangeText={setPrice}
                />
                {errors.price && <Text style={styles.errorsText}>{errors.price}</Text>}
            </View>

            <View style={styles.fieldContainer}>
                <Text>Image</Text>
                <Spacer size={10} />
                <View style={styles.imageContainer}>
                    <View style={styles.image} >
                        {
                            image &&
                            <TouchableOpacity style={{ top: 0, left: 0 }} onPress={() => {
                                setImage(null)
                            }}>
                                <Image color="red" source={require('../assets/images/delete.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        }
                        <Image source={image ? image : require('../assets/images/noimage.png')} style={styles.image} />
                    </View>

                </View>
            </View>
            <Spacer size={10} />
            <View style={{ flexDirection: 'row', alignSelf: "center" }}>
                <Button
                    title="Pick from Library"
                    onPress={() => { handleImagePick('library') }}
                    style={styles.addButtonStyle}
                    textStyle={styles.addTextStyle}
                />
                <Spacer size={20} horizontal />
                <Button
                    title="Open Camera"
                    onPress={() => { handleImagePick('camera') }}
                    style={styles.addButtonStyle}
                    textStyle={styles.addTextStyle}
                />
            </View>


            <Spacer size={10} />

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    style={styles.addButtonStyle}
                    textStyle={styles.addTextStyle}
                />
                <Spacer size={10} horizontal />
                <Button
                    title="Cancel"
                    onPress={() => {

                    }}
                    style={styles.cancelButtonStyle}
                    textStyle={styles.cancelTextStyle}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    fieldContainer: {
        padding: 20
    },
    addButtonStyle: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    addTextStyle: {
        fontSize: 16,
        color: 'yellow',
    },
    cancelButtonStyle: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    cancelTextStyle: {
        fontSize: 16,
        color: '#fff',
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    errorsText: {
        color: 'red',
        marginTop: 5
    },
    imageContainer: {
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        boderRadius: 10
    }
})

export default UpdateProduct;