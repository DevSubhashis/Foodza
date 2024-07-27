import React, { useEffect, useState } from "react";
import ProductService from "../service/ProductService";

const ProductHomeViewModel = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const products = await ProductService.fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return {
        products, error
    };
}

export default ProductHomeViewModel;