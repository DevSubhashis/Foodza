import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Button from "./Button";
import Spacer from "./Spacer";

const ProductItem = ({ item, onEditPress = ()=>{} , onDeletePress = ()=>{} }) => (
    <View style={styles.productContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <View style={styles.productDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Spacer size={5} />
            <View style={{ flexDirection: 'row' }}>
                <Button title={"Edit"}  onPress={onEditPress} imageSource={require('../assets/images/edit.png')}  />
                <Spacer size={10} horizontal/>
                <Button title={"Delete"}  styleonPress={onDeletePress} imageSource={require('../assets/images/delete.png')}  />
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        elevation: 2
    },
    productDetails: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10
    },
    price: {
        fontSize: 14,
        color: "#6200ee"
    }
});

export default ProductItem;
