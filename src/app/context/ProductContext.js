"use client";

import React, {createContext, useState, useContext, useEffect} from "react";
import {useNotificationContext} from "@/app/context/NotificationContext";
import ProductFetcher, {fetchProducts} from "@/app/backend/ProductFetcherComponent";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state
    const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Form visibility state
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [handleAddProduct, setHandleAddProduct] = useState(false);
    const [handleRemoveProduct, setHandleRemoveProduct] = useState(false);
    const [handleEditProduct, setHandleEditProduct] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const { addNotification } = useNotificationContext();

    const handlePriceFilter = ({ min = 0, max = Infinity }) => {
        setPriceRange({ min, max });
        const filtered = products.filter(product =>
            product.unitPrice >= min &&
            product.unitPrice <= max &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        const { min, max } = priceRange;
        const filtered = products.filter(product =>
            (!category || product.category === category) &&
            product.unitPrice >= min &&
            product.unitPrice <= max
        );
        setFilteredProducts(filtered);
    };

    const handleInfoClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseInfo = () => {
        setSelectedProduct(null);
    };

    const handleEditClick = (product) => {
        console.log("edit");
        setSelectedProduct(product);
        setIsEditFormVisible(true);
        console.log(isEditFormVisible);
    };

    const handlePriceChange = (e, type) => {
        const value = e.target.value;
        if (type === "min") setMinPrice(value);
        if (type === "max") setMaxPrice(value);

        handlePriceFilter({
            min: parseFloat(type === "min" ? value : minPrice) || 0,
            max: parseFloat(type === "max" ? value : maxPrice) || Infinity,
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        handleCategoryFilter(category);
    };

    useEffect(() => {
        console.log("FILTERED")
        const filtered = products.filter(product => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesPrice =
                product.unitPrice >= priceRange.min &&
                product.unitPrice <= priceRange.max;

            return matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [products, selectedCategory, priceRange]);

    const value = {
        products,
        setProducts,
        categories,
        setCategories,
        filteredProducts,
        setFilteredProducts,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        selectedProduct,
        setSelectedProduct,
        isFormVisible,
        setIsFormVisible,
        isEditFormVisible,
        setIsEditFormVisible,
        handleAddProduct,
        setHandleAddProduct,
        handleRemoveProduct,
        setHandleRemoveProduct,
        handleEditProduct,
        setHandleEditProduct,
        currentPage,
        setCurrentPage,
        handlePriceFilter,
        handleCategoryFilter,
        handleInfoClick,
        handleCloseInfo,
        handleEditClick,
        handlePriceChange,
        handleCategoryChange
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
