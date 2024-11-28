"use client";

import React, {createContext, useState, useContext, useEffect} from "react";

const ProductContext = createContext(null);

export const ProductProvider = ({ serverProducts, children }) => {
    const [products, setProducts] = useState(serverProducts);
    const [categories, setCategories] = useState(Array.from(new Set(products.map(product => product.category))));
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state
    const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Form visibility state
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

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
    };

    useEffect(() => {
        setProducts(serverProducts);
        setFilteredProducts(serverProducts);
    }, [serverProducts]);

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
