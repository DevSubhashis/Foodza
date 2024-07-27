import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, RefreshControl } from "react-native";
import Error from '../component/Error';
import ProductState from './ProductHomeViewModel';

const ProductHome = () => {

    const products = ProductState().products;
    const error = ProductState().error;
    const [refresh, setRefresh] = useState(false);

    const page = useRef(0);
    let limit = 20;

    const onEndReachCalled = useRef(false);

    const ProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    const lodadMoreData = () =>{
        console.log("lodadMoreData");
        page.current = page.current + 1;
        // api call 
        //https://abc.com/getProct?page=1&limit=20
    }

    const onRefresh = () => {
        setRefresh(true);
        // api call
        setRefresh(false);
    }

    return (
        <View style={styles.container}>
            {
                !error ?
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductItem item={item} />}
                        contentContainerStyle={styles.list}
                        keyExtractor={item => item.id}
                        initialNumToRender={5}
                        //ListEmptyComponent={<Error errorMessage={error}/>}
                        onEndReached={()=>{
                            // if(onEndReachCalled.current){
                            //   lodadMoreData();
                            // }
                            lodadMoreData();
                        }}
                        onEndReachedThreshold={10}
                        onRefresh={()=>{
                            onRefresh();
                        }}
                        refreshing={refresh}
                       
                    /> : 
                   <Error errorMessage={error}/>
            }

        </View>
    )
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