// ProductHome.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Error from '../component/Error';
import useProductViewModel from "../screens/ProductHomeViewModel";

const ProductHome = () => {
    const { products, error, refresh, loadMoreData, onRefresh, onEndReachedCalledDuringMomentum } = useProductViewModel();

    const ProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.productDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {
                !error ?
                    <View style={{ flex: 1 }} >
                        <FlatList
                            data={products}
                            renderItem={({ item }) => <ProductItem item={item} />}
                            contentContainerStyle={styles.list}
                            keyExtractor={item => item.id}
                            initialNumToRender={10}
                            onMomentumScrollBegin={() => {
                                // Prevent calling `loadMoreData` multiple times
                                onEndReachedCalledDuringMomentum.current = false;
                            }}
                            onEndReached={loadMoreData}
                            onEndReachedThreshold={0.1}
                            onRefresh={onRefresh}
                            refreshing={refresh}
                        />
                    </View>
                    :
                    <Error errorMessage={error} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    list: {
        padding: 10,
    },
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 14,
        color: "#6200ee"
    }
})

export default ProductHome;
