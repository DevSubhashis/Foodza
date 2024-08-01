// ProductHome.js
import React from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Alert } from "react-native";
import Error from '../component/Error';
import ProductHomeViewModel from "../screens/ProductHomeViewModel";
import Header from '../component/Header';

import ProductItem from '../component/ProductItem';

const ProductHome = () => {
    const { products, error, refresh, loadMoreData, onRefresh, onEndReachedCalledDuringMomentum, navigateToUpdatePage } = ProductHomeViewModel();

    const showAlertConfrimation = () =>
        Alert.alert(
            'Delete',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        
                    },
                }
            ]
        );

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Product List"} onPress={navigateToUpdatePage} addButton />
            {
                !error ?
                    <View style={{ flex: 1 }} >
                        <FlatList
                            data={products}
                            renderItem={({ item }) => <ProductItem item={item}
                                onEditPress={() => {
                                    navigateToUpdatePage({
                                        product: item
                                    });
                                }}
                                onDeletePress={() => {
                                    showAlertConfrimation();
                                }}
                            />
                            }
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    list: {
        padding: 10,
    }
})

export default ProductHome;