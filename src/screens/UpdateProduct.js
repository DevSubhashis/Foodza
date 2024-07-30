// UpdateProduct.js
import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from '../component/Header';
import Spacer from '../component/Spacer';
import Button from '../component/Button';

const UpdateProduct = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Add Product"} onPress={() => { }} />

            <View style={styles.fieldContainer}>
                <Text>Title</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Title"
                    testID="prouctTitle"
                    accessibilityLabel="prouctTitle"
                    style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10
                    }}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text>Price</Text>
                <Spacer size={10} />
                <TextInput
                    placeholder="Enter Product Price"
                    testID="prouctPrice"
                    accessibilityLabel="prouctPrice"
                    keyboardType={"decimal-pad"}
                    style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10
                    }}
                    onChangeText={(value) => {
                        console.log(value);
                    }}
                />
            </View>

            <Spacer size={10} />

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Button
                    title="Submit"
                    onPress={() => { }}
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
})

export default UpdateProduct;
