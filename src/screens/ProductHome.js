// ProductHome.js
import React from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from "react-native";
import Error from '../component/Error';
import ProductHomeViewModel from "../screens/ProductHomeViewModel";
import Header from '../component/Header';
import FilterModal from "../component/FilterModal";
import ProductItem from '../component/ProductItem';
import { Badge } from 'react-native-elements'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const ProductHome = () => {
    const {
        products,
        error,
        refresh,
        loadMoreData,
        onRefresh,
        onEndReachedCalledDuringMomentum,
        navigateToUpdatePage,
        setFilterModalVisible,
        filterModalVisible,
        handleApplyFilters,
        numberOfFilters
    } = ProductHomeViewModel();

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
            <Header title={"Product List"} onPress={navigateToUpdatePage} addButton drawer />
            <View style={{ height: 50, width: '100%' }}>
                <TouchableOpacity style={{ alignSelf: "flex-end", paddingRight: 10, marginTop: 10, marginBottom: 10 }}  onPress={() => setFilterModalVisible(true)}>
                    { numberOfFilters != 0 ? <Badge value={numberOfFilters} /> : null }
                    <AntDesignIcons name="filter" size={20}/>
                </TouchableOpacity>
            </View>

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

            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
            />

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