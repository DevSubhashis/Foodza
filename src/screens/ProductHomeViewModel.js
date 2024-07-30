// ProductViewModel.js
import React, { useState, useRef, useEffect } from "react";
import ProductService from "../service/ProductService";
import { useFocusEffect } from "@react-navigation/native";

const ProductHomeViewModel = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const offset = useRef(0);
    const limit = 20;
    const onEndReachedCalledDuringMomentum = useRef(true);

    const fetchData = async (resetOffset = false) => {
        try {
            if (resetOffset) {
                offset.current = 0;
            }
            const fetchedProducts = await ProductService.fetchProducts(offset.current, limit);
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

    useFocusEffect( 
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    
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

    return {
        products,
        error,
        refresh,
        loadMoreData,
        onRefresh,
        onEndReachedCalledDuringMomentum
    };
};

export default ProductHomeViewModel;
