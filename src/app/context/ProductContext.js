"use client";

import React, {createContext, useState, useContext, useEffect} from "react";
import {useNotificationContext} from "@/app/context/NotificationContext";

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
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch the JSON file from the public folder
                const response = await fetch('/data/products.json');
                const productsData = await response.json();

                setProducts(productsData.shop_items);
                setFilteredProducts(productsData.shop_items);

                // Extract unique categories
                const uniqueCategories = Array.from(
                    new Set(productsData.shop_items.map(product => product.category))
                );
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);

        // Reapply filtering if any filters are active
        const filtered = updatedProducts.filter(product =>
            product.price_per_unit >= priceRange.min &&
            product.price_per_unit <= priceRange.max &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);

        addNotification(`Product "${newProduct.name}" added successfully!`);
    };

    const handlePriceFilter = ({ min = 0, max = Infinity }) => {
        setPriceRange({ min, max });
        const filtered = products.filter(product =>
            product.price_per_unit >= min &&
            product.price_per_unit <= max &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        const { min, max } = priceRange;
        const filtered = products.filter(product =>
            (!category || product.category === category) &&
            product.price_per_unit >= min &&
            product.price_per_unit <= max
        );
        setFilteredProducts(filtered);
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);

        const updatedFilteredProducts = filteredProducts.filter(product => product.id !== productId);
        setFilteredProducts(updatedFilteredProducts);
    };

    const handleInfoClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseInfo = () => {
        setSelectedProduct(null);
    };

    const handleEditProduct = (updatedProduct) => {
        const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);

        // Update filtered products
        const filtered = updatedProducts.filter((product) =>
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);

        setIsEditFormVisible(false);
        addNotification(`Product "${updatedProduct.name}" updated successfully!`);
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
                product.price_per_unit >= priceRange.min &&
                product.price_per_unit <= priceRange.max;

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
        handlePriceFilter,
        handleCategoryFilter,
        handleRemoveProduct,
        handleInfoClick,
        handleCloseInfo,
        handleEditProduct,
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
