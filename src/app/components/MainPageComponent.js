// MainPageComponent.js
"use client";

import { useState, useEffect } from "react";
import TopMenuComponent from "@/app/components/TopMenuComponent";
import ProductGrid from "@/app/components/ProductGridComponent";
import ProductInfoComponent from "@/app/components/ProductInfoComponent";
import ProductFormComponent from "@/app/components/ProductFormComponent";
import ProductEditComponent from "@/app/components/ProductEditComponent";

export default function MainPageComponent({ serverProducts }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state
    const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Form visibility state

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
        console.log("edit")
        setSelectedProduct(product);
        setIsEditFormVisible(true);
        console.log(isEditFormVisible)
    };

    const categories = Array.from(new Set(serverProducts.map(product => product.category)));

    return (
        <>
            <TopMenuComponent
                onFilter={handlePriceFilter}
                onCategoryFilter={handleCategoryFilter}
                selectedCategory={selectedCategory}
                categories={categories}
                onAddClick={() => setIsFormVisible(true)} // Pass function to show form
            />
            <ProductGrid
                products={filteredProducts}
                onRemoveProduct={handleRemoveProduct}
                onInfoClick={handleInfoClick}
                onEditClick={handleEditClick}
            />
            {isFormVisible && (
                <ProductFormComponent
                    onClose={() => setIsFormVisible(false)}
                    onAddProduct={handleAddProduct} // Pass add function
                    categories={categories}
                />
            )}
            {isEditFormVisible && (
                <ProductEditComponent
                    product={selectedProduct}
                    onEdit={handleEditProduct}
                    onClose={() => setIsEditFormVisible(false)}
                />
            )}
        </>
    );
}
