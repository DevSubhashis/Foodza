// ProductViewModel.js
import React, { useState, useRef, useEffect } from "react";
import ProductService from "../service/ProductService";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const ProductHomeViewModel = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    // const [filters, setFilters] = useState({});
    const [numberOfFilters, setNumberOfFilters] = useState(0);

    const offset = useRef(0);
    const limit = 20;
    const onEndReachedCalledDuringMomentum = useRef(true);

    const navigate = useNavigation();

    const navigateToUpdatePage = (payload = {}) => {
        navigate.push('UpdateProduct', payload);
    }

    const fetchData = async (resetOffset = false, payload = {}) => {
        try {
            if (resetOffset) {
                offset.current = 0;
            }
            const fetchedProducts = await ProductService.fetchProducts(offset.current, limit, payload);
            if (resetOffset) {
                setProducts(fetchedProducts);
            } else {
                setProducts(prevProducts => prevProducts.concat(fetchedProducts));
            }
            onEndReachedCalledDuringMomentum.current = true;
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    // useEffect(() => {
    //     doFilter();
    // }, [filters]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData(true);
        }, [])
    );

    // const doFilter = () => { // FOR LOCAL FILTER
    //     if(filters.length == 0){
    //         return;
    //     }
    //     const newItems = products.filter(product => {
    //         const titleMatch = product.title.toLowerCase().includes(filters.title.toLowerCase());
    //         const dateMatch = new Date(product.expired_date) >= new Date(filters.expiredDate);
    //         const sizeMatch = filters.size ? product.size === filters.size : true;
    //         const originMatch = product.product_origin === filters.origin;
    //         const categoryMatch = Object.keys(filters.categories).length === 0 ||
    //             filters.categories[product.category];
    //         const priceMatch = product.price >= filters.priceRange[0] &&
    //             product.price <= filters.priceRange[1];

    //         return titleMatch && dateMatch && sizeMatch && originMatch && categoryMatch && priceMatch;
    //     });
    //     setProducts(newItems);
    // }

    const loadMoreData = () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            offset.current = offset.current + limit;
            fetchData();
        }
    };

    const onRefresh = async () => {
        setRefresh(true);
        try {
            await fetchData(true); // Reset offset and fetch new data
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setRefresh(false);
        }
    };

    const handleApplyFilters = (newFilters) => {
        //setFilters(newFilters);
        console.log(newFilters);
        // {
        //     "categories": ["Electronics", "Clothing", "Books"], 
        //     "origin": "non-indian", 
        //     "searchText": "Sdsds", 
        //     "size": "medium", 
        //     "expiredDate": 2024-09-24T19:27:00.000Z
        // }
        countFilters(newFilters);
        fetchData(true, newFilters);
    };

    const countFilters = (filters) => {
        let count = 0;
    
        // Check if each filter is applied
        if (filters.categories && filters.categories.length > 0) {
            count++;
        }
        if (filters.expiredDate) {
            count++;
        }
        if (filters.origin) {
            count++;
        }
        if (filters.searchText && filters.searchText.trim() !== "") {
            count++;
        }
        if (filters.size) {
            count++;
        }
    
        setNumberOfFilters(count);
    }

    return {
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
    };
};

export default ProductHomeViewModel;